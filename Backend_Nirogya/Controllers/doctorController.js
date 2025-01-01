const Doctor = require('../Models/Doctor');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Helper function to calculate distance between two coordinates
const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

// Signup a new doctor
const signupDoctor = async (req, res) => {
  const { name, hospitalName, specialty, location, days, appointmentTimes,city, fees, email, password } = req.body;

  try {
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor with this email already exists.' });
    }

    const doctor = new Doctor({ 
      name, 
      hospitalName, 
      specialty, 
      location, // Ensure location is stored as "latitude,longitude"
      days, 
      appointmentTimes, 
      fees, 
      email,
      city, 
      password 
    });
    
    await doctor.save();

    // Generate token for automatic login after signup
    const token = generateToken(doctor._id);

    res.status(201).json({ 
      message: 'Doctor signed up successfully', 
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        specialty: doctor.specialty
      },
      token 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error signing up doctor', error: error.message });
  }
};

// Get all doctors with optional location sorting
const getAllDoctors = async (req, res) => {
  try {
    const { userLat, userLng } = req.query;
    const doctors = await Doctor.find().select('-password');

    if (userLat && userLng) {
      // If user location is provided, calculate distances and sort
      const doctorsWithDistance = doctors.map(doctor => {
        const [docLat, docLng] = doctor.location.split(',').map(Number);
        const distance = calculateDistance(
          parseFloat(userLat), 
          parseFloat(userLng), 
          docLat, 
          docLng
        );
        return { ...doctor.toObject(), distance };
      });

      doctorsWithDistance.sort((a, b) => a.distance - b.distance);
      return res.status(200).json(doctorsWithDistance);
    }

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors', error: error.message });
  }
};

// Get doctors by specialty with location-based sorting
const getDoctorsBySpecialty = async (req, res) => {
  try {
    const { specialty } = req.query;

    if (!specialty) {
      return res.status(400).json({ message: 'Specialty is required' });
    }

    // Fetch doctors with the specified specialty
    const doctors = await Doctor.find({ specialty: specialty.trim() }).select('-password');

    if (!doctors.length) {
      return res.status(404).json({ message: 'No doctors found for the given specialty' });
    }

    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Error fetching doctors', error: error.message });
  }
};

// Get a doctor by ID
const getDoctorById = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await Doctor.findById(id).select('-password');
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctor', error: error.message });
  }
};

// Delete a doctor by ID
const deleteDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await Doctor.findByIdAndDelete(id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting doctor', error: error.message });
  }
};

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Login Doctor
const loginDoctor = async (req, res) => {
  const { email, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(doctor._id);

    res.status(200).json({
      message: "Login successful",
      token,
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        specialty: doctor.specialty,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Search doctors with multiple filters
const searchDoctors = async (req, res) => {
  try {
    const { 
      specialty, 
      userLat, 
      userLng, 
      maxDistance, 
      maxFees,
      availability 
    } = req.query;

    // Build query object
    const query = {};
    if (specialty) query.specialty = specialty;
    if (maxFees) query.fees = { $lte: parseFloat(maxFees) };
    if (availability) query.days = availability;

    const doctors = await Doctor.find(query).select('-password');

    if (userLat && userLng) {
      // Calculate and filter by distance if location is provided
      const doctorsWithDistance = doctors.map(doctor => {
        const [docLat, docLng] = doctor.location.split(',').map(Number);
        const distance = calculateDistance(
          parseFloat(userLat), 
          parseFloat(userLng), 
          docLat, 
          docLng
        );
        return { ...doctor.toObject(), distance };
      });

      // Filter by maximum distance if provided
      const filteredDoctors = maxDistance 
        ? doctorsWithDistance.filter(doc => doc.distance <= parseFloat(maxDistance))
        : doctorsWithDistance;

      // Sort by distance
      filteredDoctors.sort((a, b) => a.distance - b.distance);
      return res.status(200).json(filteredDoctors);
    }

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error searching doctors', 
      error: error.message 
    });
  }
};

module.exports = { 
  signupDoctor, 
  getAllDoctors, 
  getDoctorById, 
  deleteDoctor, 
  loginDoctor,
  getDoctorsBySpecialty,
  searchDoctors 
};