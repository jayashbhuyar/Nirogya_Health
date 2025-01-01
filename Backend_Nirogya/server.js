const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import CORS
require("dotenv").config();
const doctorRoutes = require('./Routes/doctorRoutes');

const app = express();
const PORT = process.env.PORT || 6000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());
app.use('/api/doctors', doctorRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Basic Route
app.get("/", (req, res) => {
  res.send("Nirogya Backend is Running!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
