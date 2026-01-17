const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const dotenv = require("dotenv");
const connectDB = require("./config/db.js");

const path = require("path");

dotenv.config();

const app = express();

// Database connection logic (Connect only when needed)
const connectToDatabase = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error("Critical: Could not connect to MongoDB", error);
  }
};

app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "x-admin-secret", "Authorization"]
}));

app.use(express.json());

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Add a middleware to ensure DB is connected
app.use(async (req, res, next) => {
  await connectToDatabase();
  next();
});

const userRoutes = require("./router/routes.js");
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ 
    message: "PAC Agriculture API is running...",
    database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Handle Multer errors
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        success: false, 
        message: "File too large. Maximum size allowed is 50MB." 
      });
    }
    return res.status(400).json({ 
      success: false, 
      message: err.message 
    });
  }

  res.status(500).json({ 
    error: "Internal Server Error", 
    message: err.message 
  });
});
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

module.exports = app;
