import React, { useState } from 'react';
import axios from 'axios';
// import { navigate } from 'react-router-dom';

const DoctorSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    hospitalName: '',
    specialty: '',
    city: '',
    location: '',
    days: [],
    appointmentTimes: [{ startTime: '', endTime: '' }],
    fees: '',
    email: '',
    password: '',
  });
// const navigate = useNavigate();
  const specialties = [
    "Cardiology", "Dermatology", "Endocrinology", "Gastroenterology",
    "General Surgery", "Neurology", "Obstetrics & Gynecology", "Oncology",
    "Ophthalmology", "Orthopedics", "Pediatrics", "Psychiatry",
    "Pulmonology", "Radiology", "Urology"
  ];

  const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow"];

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDaysChange = (day) => {
    setFormData((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };

  const handleTimeSlotChange = (index, field, value) => {
    const updatedTimes = [...formData.appointmentTimes];
    updatedTimes[index][field] = value;
    setFormData({ ...formData, appointmentTimes: updatedTimes });
  };

  const addTimeSlot = () => {
    setFormData((prev) => ({
      ...prev,
      appointmentTimes: [...prev.appointmentTimes, { startTime: '', endTime: '' }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/doctors/signup', formData);
      alert('Signup successful!');
      // navigate('/admin'); // Navigate to the admin page
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message);
      alert('Signup failed. Please try again.');
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg transform transition duration-500 hover:scale-105"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gradient bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Doctor Signup
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Hospital Name */}
        <div className="mb-4">
          <label htmlFor="hospitalName" className="block text-gray-700 font-medium mb-2">Hospital Name</label>
          <input
            type="text"
            id="hospitalName"
            name="hospitalName"
            value={formData.hospitalName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Specialty */}
        <div className="mb-4">
          <label htmlFor="specialty" className="block text-gray-700 font-medium mb-2">Specialty</label>
          <select
            id="specialty"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          >
            <option value="">Select a specialty</option>
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>

        {/* City */}
        <div className="mb-4">
  <label htmlFor="city" className="block text-gray-700 font-medium mb-2">City</label>
  <select
    id="city"
    name="city"
    value={formData.city}
    onChange={handleChange}
    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
    required
  >
    <option value="">Select a city</option>
    {cities.map((city) => (
      <option key={city} value={city}>{city}</option>
    ))}
  </select>
</div>


        {/* Location */}
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 font-medium mb-2">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Days */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Available Days</label>
          <div className="flex flex-wrap gap-2">
            {daysOfWeek.map((day) => (
              <label key={day} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={day}
                  checked={formData.days.includes(day)}
                  onChange={() => handleDaysChange(day)}
                  className="h-4 w-4 text-purple-500"
                />
                <span>{day}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Appointment Times */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Appointment Times</label>
          {formData.appointmentTimes.map((slot, index) => (
            <div key={index} className="flex gap-4 mb-2">
              <input
                type="time"
                value={slot.startTime}
                onChange={(e) => handleTimeSlotChange(index, 'startTime', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <input
                type="time"
                value={slot.endTime}
                onChange={(e) => handleTimeSlotChange(index, 'endTime', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addTimeSlot}
            className="text-purple-500 hover:underline"
          >
            Add Time Slot
          </button>
        </div>

        {/* Fees */}
        <div className="mb-4">
          <label htmlFor="fees" className="block text-gray-700 font-medium mb-2">Fees</label>
          <input
            type="number"
            id="fees"
            name="fees"
            value={formData.fees}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            min="0"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            minLength="6"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-transform transform hover:scale-105"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default DoctorSignup;
