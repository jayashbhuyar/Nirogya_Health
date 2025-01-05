import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Hospital, UserPlus, Phone, Calendar, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './pages/Navbar';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchType, setSearchType] = useState('disease');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSpecialties, setShowSpecialties] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState('all');

  // Updated cities array
  const cities = ["Harbour Line", "Central Line", "Western Line"];
  
  // Add 'All Cities' option to the beginning
  const allCities = ['all', ...cities];

  const specialties = [
    "Cardiology", "Dermatology", "Endocrinology", "Gastroenterology",
    "General Surgery", "Neurology", "Obstetrics & Gynecology", "Oncology",
    "Ophthalmology", "Orthopedics", "Pediatrics", "Psychiatry",
    "Pulmonology", "Radiology", "Urology"
  ];

  useEffect(() => {
    // Get user's location when component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  // Add useEffect to handle city filtering
  useEffect(() => {
    if (selectedCity === 'all') {
      setFilteredDoctors(doctors);
    } else {
      const filtered = doctors.filter(doctor => 
        doctor.city && doctor.city.toLowerCase() === selectedCity.toLowerCase()
      );
      setFilteredDoctors(filtered);
    }
  }, [selectedCity, doctors]);

  const fetchDoctors = async (specialty) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/doctors/v1/specialty?specialty=${specialty}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // Ensure data is an array before processing
      const doctorsArray = Array.isArray(data) ? data : Array.isArray(data.doctors) ? data.doctors : [];
      
      // Only sort if we have user location and valid doctor data
      if (userLocation) {
        doctorsArray.sort((a, b) => {
          if (!a.location || !b.location) return 0;
          const distanceA = calculateDistance(a.location);
          const distanceB = calculateDistance(b.location);
          return distanceA - distanceB;
        });
      }
      
      setDoctors(doctorsArray);
      setFilteredDoctors(doctorsArray); // Initialize filtered doctors
      setSelectedCity('all'); // Reset city filter when new doctors are fetched
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setDoctors([]); // Reset doctors state on error
      setFilteredDoctors([]); // Reset filtered doctors on error
    } finally {
      setLoading(false);
    }
  };
  
  const calculateDistance = (doctorLocation) => {
    try {
      if (!doctorLocation || typeof doctorLocation !== 'string') return Infinity;
      const [lat, lng] = doctorLocation.split(',').map(Number);
      if (isNaN(lat) || isNaN(lng) || !userLocation) return Infinity;
      
      return Math.sqrt(
        Math.pow(lat - userLocation.lat, 2) + 
        Math.pow(lng - userLocation.lng, 2)
      );
    } catch (error) {
      console.error('Error calculating distance:', error);
      return Infinity;
    }
  };

  const DoctorCard = ({ doctor }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
          <p className="text-blue-600 font-medium">{doctor.specialty}</p>
        </div>
        <div className="bg-blue-100 rounded-full p-2">
          <Hospital className="h-6 w-6 text-blue-600" />
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{doctor.hospitalName}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{doctor.days.join(', ')}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="h-4 w-4 mr-2" />
          <span>₹{doctor.fees} per consultation</span>
        </div>
      </div>
      
      <button className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
        Book Appointment
      </button>
    </div>
  );

  const SearchSection = () => (
    <div className="relative">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSpecialties(true);
            }}
            onFocus={() => setShowSpecialties(true)}
            placeholder={searchType === 'disease' ? "Search by specialty..." : "Search by doctor's name..."}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button 
          className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition"
          onClick={() => {
            if (searchType === 'disease' && searchQuery) {
              fetchDoctors(searchQuery);
              setShowSpecialties(false);
            }
          }}
        >
          Search
        </button>
      </div>

      {showSpecialties && searchType === 'disease' && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {specialties
            .filter(specialty => 
              specialty.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((specialty, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                onClick={() => {
                  setSearchQuery(specialty);
                  setShowSpecialties(false);
                  fetchDoctors(specialty);
                }}
              >
                {specialty}
              </div>
            ))}
        </div>
      )}
    </div>
  );

  const CityFilter = () => (
    <div className="mb-6">
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {allCities.map((city) => (
          <option key={city} value={city}>
            {city === 'all' ? 'All Cities' : city}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-100 to-white py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6">
              Your Health, Our Priority
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Find the best healthcare providers and medical services near you
            </p>

            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                <button
                  className={`px-4 py-2 rounded-full ${
                    searchType === 'disease' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  } transition`}
                  onClick={() => setSearchType('disease')}
                >
                  Search by Disease
                </button>
                {/* <button
                  className={`px-4 py-2 rounded-full ${
                    searchType === 'doctor' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  } transition`}
                  onClick={() => setSearchType('doctor')}
                >
                  Search by Doctor
                </button> */}
              </div>
              
              <SearchSection />
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Results Section */}
      {doctors.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800">Available Doctors</h3>
              <CityFilter />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor, index) => (
                <DoctorCard key={index} doctor={doctor} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16" id="services">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Services
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Hospital className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-center">Find Hospitals</h4>
              <p className="text-gray-600 text-center">
                Search and compare hospitals based on specialties, ratings, and patient reviews.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <UserPlus className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-center">Find Doctors</h4>
              <p className="text-gray-600 text-center">
                Connect with specialized doctors and book appointments online.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-center">24/7 Support</h4>
              <p className="text-gray-600 text-center">
                Access emergency services and medical support anytime.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-center">Online Booking</h4>
              <p className="text-gray-600 text-center">
                Schedule appointments and get instant confirmations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h4 className="text-4xl font-bold mb-2">500+</h4>
              <p className="text-xl">Registered Hospitals</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold mb-2">2000+</h4>
              <p className="text-xl">Qualified Doctors</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold mb-2">50000+</h4>
              <p className="text-xl">Happy Patients</p>
            </div>
          </div>
        </div>
      </section>

     {/* Contact Section */}
     <section className="py-16 bg-gray-50" id="contact">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Get in Touch
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <MapPin className="h-6 w-6 text-blue-600" />
                  <div>
                    <h4 className="font-semibold">Location</h4>
                    <p className="text-gray-600">123 Healthcare Avenue, City</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-blue-600" />
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <div>
                    <h4 className="font-semibold">Working Hours</h4>
                    <p className="text-gray-600">24/7 Emergency Support</p>
                  </div>
                </div>
              </div>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Hospital className="h-8 w-8 text-blue-400 mr-2" />
                <h4 className="text-xl font-bold">Nirogya</h4>
              </div>
              <p className="text-gray-400">
                Your trusted partner in finding the best healthcare services.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Home</a></li>
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Services</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Services</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Find Hospitals</a></li>
                <li><a href="#" className="hover:text-white">Find Doctors</a></li>
                <li><a href="#" className="hover:text-white">Emergency Services</a></li>
                <li><a href="#" className="hover:text-white">Online Booking</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Newsletter</h5>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletter for updates.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow px-4 py-2 bg-gray-700 rounded-l focus:outline-none"
                />
                <button className="bg-blue-600 px-4 py-2 rounded-r hover:bg-blue-700">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Nirogya. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;