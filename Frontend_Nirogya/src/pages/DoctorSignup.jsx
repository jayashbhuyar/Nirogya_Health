import React, { useState } from 'react';
import axios from 'axios';
// import { navigate } from 'react-router-dom';
import Navbar from './Navbar';

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

  const specialties = [
    "Cardiology", "Dermatology", "Endocrinology", "Gastroenterology",
    "General Surgery", "Neurology", "Obstetrics & Gynecology", "Oncology",
    "Ophthalmology", "Orthopedics", "Pediatrics", "Psychiatry",
    "Pulmonology", "Radiology", "Urology"
  ];

  const cities = ["Harbour Line", "Central Line", "Western Line"];
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
      const response = await axios.post('http://localhost:8000/api/doctors/v2/signup', formData);
      alert('Signup successful!');
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div 
        className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative"
        style={{
          backgroundImage: 'url("https://img.freepik.com/free-vector/shiny-green-heartbeat-pulse-electrocardiogram-design-creative-background-health-medical-concept_1302-5649.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/70 via-purple-50/70 to-pink-50/70"></div>

        
        {/* Content container */}
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Join Our Medical Network
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              Empower your practice with our digital healthcare platform
            </p>
          </div>

          {/* Main Form Card */}
          <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-6 transform transition-all duration-500 hover:shadow-2xl">
            {/* Personal Information Section */}
            <div className="space-y-6 border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-semibold text-gray-800 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  required
                  minLength="6"
                />
              </div>
            </div>

            {/* Professional Information Section */}
            <div className="space-y-6 border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-semibold text-gray-800 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Professional Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700">Hospital Name</label>
                  <input
                    type="text"
                    id="hospitalName"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">Specialty</label>
                  <select
                    id="specialty"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    required
                  >
                    <option value="">Select a specialty</option>
                    {specialties.map((specialty) => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div className="space-y-6 border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-semibold text-gray-800 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Location & Fees
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    required
                  >
                    <option value="">Select a city</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">Specific Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="fees" className="block text-sm font-medium text-gray-700">Consultation Fees (₹)</label>
                  <input
                    type="number"
                    id="fees"
                    name="fees"
                    value={formData.fees}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    required
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Availability Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Availability
              </h2>
              
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Available Days</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {daysOfWeek.map((day) => (
                    <label key={day} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-purple-50 transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        value={day}
                        checked={formData.days.includes(day)}
                        onChange={() => handleDaysChange(day)}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">Appointment Time Slots</label>
                  {/* <button
                    type="button"
                    onClick={addTimeSlot}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700"
                  >
                    + Add Time Slot
                  </button> */}
                </div>
                <div className="space-y-3">
                  {formData.appointmentTimes.map((slot, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="time"
                          value={slot.startTime}
                          onChange={(e) => handleTimeSlotChange(index, 'startTime', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="time"
                          value={slot.endTime}
                          onChange={(e) => handleTimeSlotChange(index, 'endTime', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                          required
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transform transition-all hover:scale-105"
              >
                Complete Registration
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DoctorSignup;