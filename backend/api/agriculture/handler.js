const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const dotenv = require("dotenv");
const connectDB = require("./config/db.js");

dotenv.config();
connectDB();
const app = express();
app.use(cors({
  origin: "*", // You can change this to your Netlify URL later for security
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "x-admin-secret"]
}));
app.use(express.json());



const userRoutes = require("./router/routes.js");
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("PAC Agriculture API is running...");
});


const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

module.exports = app;
