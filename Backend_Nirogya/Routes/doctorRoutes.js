const express = require('express');
const { signupDoctor, getAllDoctors, getDoctorById, deleteDoctor, loginDoctor,getDoctorsBySpecialty,searchDoctors } = require('../Controllers/doctorController');

const router = express.Router();

// Routes
router.post('/signup', signupDoctor); // Doctor signup
router.get('/', getAllDoctors); // Get all doctors
router.get('/:id', getDoctorById); // Get a doctor by ID
router.delete('/:id', deleteDoctor); // Delete a doctor by ID
router.post("/login", loginDoctor);
router.get('/v1/specialty', getDoctorsBySpecialty);

router.get('/doctors/search', searchDoctors);

module.exports = router;
