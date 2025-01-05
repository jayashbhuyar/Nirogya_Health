import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://cdn.vectorstock.com/i/500p/80/33/health-nature-men-logo-vector-878033.jpg"
              alt="Nirogya Logo"
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-2xl font-bold tracking-wide">Nirogya</h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="hover:text-yellow-300 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-yellow-300 transition duration-300"
            >
              About
            </Link>
            <Link
              to="/doctors"
              className="hover:text-yellow-300 transition duration-300"
            >
              Doctors
            </Link>
            <Link
              to="/services"
              className="hover:text-yellow-300 transition duration-300"
            >
              Services
            </Link>
            {/* Admin Login */}
            <Link
              to="/login"
              className="bg-yellow-400 text-blue-800 px-4 py-2 rounded-full hover:bg-yellow-500 transition duration-300"
            >
              Admin Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 90 }}
                className="w-6 h-6"
              >
                ✖
              </motion.div>
            ) : (
              <motion.div
                initial={{ rotate: -90 }}
                animate={{ rotate: 0 }}
                className="w-6 h-6"
              >
                ☰
              </motion.div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-blue-700 shadow-md"
        >
          <div className="flex flex-col items-center space-y-4 py-4">
            <Link
              to="/"
              className="hover:text-yellow-300 transition duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-yellow-300 transition duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/doctors"
              className="hover:text-yellow-300 transition duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Doctors
            </Link>
            <Link
              to="/services"
              className="hover:text-yellow-300 transition duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            {/* Admin Login */}
            <Link
              to="/login"
              className="bg-yellow-400 text-blue-800 px-4 py-2 rounded-full hover:bg-yellow-500 transition duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin Login
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
