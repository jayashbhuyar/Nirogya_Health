import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LandingPage from './LandingPage';
import DoctorSignup from './pages/DoctorSignup';
import DoctorLogin from './pages/DoctorLogin';
import Navbar from './pages/Navbar';
import AdminDashboard from './pages/AdminDashboard';

function App() {


  return (
   <Router>
    <Routes>
      {/* <Route path="/" element={<Navigate to="/home" />} /> */}
      <Route path="/" element={<LandingPage />} />
      {/* <Route path="/about" element={<About />} /> */}
      <Route path="/signup" element={<DoctorSignup />} />
      <Route path="/login" element={<DoctorLogin />} />
      <Route path="/navbar" element={<Navbar />} />
      <Route path="/admin" element={<AdminDashboard />} />
     </Routes>  
    </Router>
  )
}

export default App
