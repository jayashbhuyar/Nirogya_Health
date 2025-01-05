import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Stethoscope, MapPin, Mail, DollarSign, Building2, Activity } from 'lucide-react';
import Navbar from './Navbar';

const DoctorPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/doctors/v1');
        setDoctors(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch doctors');
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const specialties = ['all', ...new Set(doctors.map(doctor => doctor.specialty))];

  const filteredDoctors = selectedSpecialty === 'all' 
    ? doctors 
    : doctors.filter(doctor => doctor.specialty === selectedSpecialty);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-2xl text-blue-600">Loading doctors...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <><Navbar />
   
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
        
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-4">
          Meet Our Expert Doctors
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Experienced healthcare professionals dedicated to your well-being
        </p>

        {/* Specialty Filter */}
        <div className="flex justify-center mb-8 gap-2 flex-wrap">
          {specialties.map(specialty => (
            <button
              key={specialty}
              onClick={() => setSelectedSpecialty(specialty)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                selectedSpecialty === specialty
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              {specialty === 'all' ? 'All Specialties' : specialty}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-blue-600 p-4 text-white">
                <h2 className="text-xl font-bold mb-1">{doctor.name}</h2>
                <p className="text-blue-100 flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  {doctor.specialty}
                </p>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <span>{doctor.hospitalName}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span>{doctor.location}, {doctor.city}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <span>₹{doctor.fees.toLocaleString()} per consultation</span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="text-sm">{doctor.email}</span>
                </div>

                {/* <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2">
                  <Stethoscope className="w-5 h-5" />
                  Book Appointment
                </button> */}
              </div>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No doctors found for the selected specialty.
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default DoctorPage;