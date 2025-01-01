import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Nirogya
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-200">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-200">
            About
          </Link>
          <Link to="/doctors" className="hover:text-blue-200">
            Doctors
          </Link>
          <Link to="/services" className="hover:text-blue-200">
            Services
          </Link>

          {/* Dropdown for Specialties */}
          <div className="relative group">
            <button className="hover:text-blue-200">
              Specialties
            </button>
            <div className="absolute hidden group-hover:block bg-white text-blue-600 rounded shadow-md mt-2">
              <Link to="/specialties/dermatology" className="block px-4 py-2 hover:bg-blue-100">
                Dermatology
              </Link>
              <Link to="/specialties/cardiology" className="block px-4 py-2 hover:bg-blue-100">
                Cardiology
              </Link>
              <Link to="/specialties/neurology" className="block px-4 py-2 hover:bg-blue-100">
                Neurology
              </Link>
            </div>
          </div>
        </div>

        {/* Admin Login Button */}
        <Link
          to="/login"
          className="hidden md:block bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
        >
          Admin Login
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-700">
          <Link to="/" className="block px-4 py-2 text-white hover:bg-blue-600">
            Home
          </Link>
          <Link to="/about" className="block px-4 py-2 text-white hover:bg-blue-600">
            About
          </Link>
          <Link to="/doctors" className="block px-4 py-2 text-white hover:bg-blue-600">
            Doctors
          </Link>
          <Link to="/services" className="block px-4 py-2 text-white hover:bg-blue-600">
            Services
          </Link>
          <div className="border-t border-blue-500">
            <Link
              to="/login"
              className="block px-4 py-2 text-white bg-blue-600 hover:bg-blue-500"
            >
              Admin Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
