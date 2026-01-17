const userService = require('../services/user.service');
const nodemailer = require("nodemailer");
const axios = require("axios");

// Barwaha, MP Coordinates
const BARWAHA_LAT = 22.2536;
const BARWAHA_LON = 76.0407;

// Function to calculate distance in KM
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance.toFixed(2);
};

const UserController = {
  createUser: async (req, res) => {
    const {
      fullName,
      email,
      mobileNumber,
      currentClass,
      interested_Course,
      instagramId
    } = req.body;

    // Capture automatic tracking info
    const referrer = req.headers.referer || 'Direct Visit';
    const userAgent = req.headers['user-agent'] || 'Unknown Device';
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    // Clean IP address
    if (ip.includes(',')) ip = ip.split(',')[0].trim();
    if (ip.includes('::ffff:')) ip = ip.split(':').pop();

    let distance = null;
    let location = null; // Changed from 'Unknown' string to null object

    // Fetch Geo Location for distance
    try {
      let fetchIp = ip;
      if (fetchIp === '127.0.0.1' || fetchIp === '::1') fetchIp = '27.7.0.1'; // Test IP
      
      const geoResponse = await axios.get(`http://ip-api.com/json/${fetchIp}`);
      if (geoResponse.data.status === 'success') {
        const { city, regionName, lat, lon } = geoResponse.data;
        location = {
          lat,
          lng: lon,
          address: `${city}, ${regionName}`
        };
        distance = calculateDistance(BARWAHA_LAT, BARWAHA_LON, lat, lon);
      }
    } catch (err) {
      console.error("Geo fetch error for enrollment:", err.message);
    }

    try {
      const inserData = {
        fullName,
        email,
        mobileNumber,
        currentClass,
        interested_Course,
        instagramId,
        distance,
        location,
        userType: 'enrollment'
      };

      // Check if user already exists with this email
      const existingUser = await userService.getUserByEmail(email);
      
      let result;
      if (existingUser) {
        // If user exists, update their details instead of creating new
        // This prevents the duplicate email error
        result = await userService.updateUser(existingUser._id, inserData);
      } else {
        result = await userService.createUser(inserData);
      }

      res.status(existingUser ? 200 : 201).json(result);

    } catch (error) {
      console.error("Registration Error:", error);
      res.status(500).json({ error: error.message });
    }
  },
  updateStatus: async (req, res) => {
    try {
      const secretKey = req.headers['x-admin-secret'];
      if (secretKey !== process.env.ADMIN_SECRET_KEY) {
        return res.status(401).json({ message: "Unauthorized access" });
      }

      const { id } = req.params;
      const { status } = req.body;
      const updatedUser = await userService.updateUserStatus(id, status);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const secretKey = req.headers['x-admin-secret'];
      if (secretKey !== process.env.ADMIN_SECRET_KEY) {
        return res.status(401).json({ message: "Unauthorized access" });
      }

      const { id } = req.params;
      await userService.deleteUser(id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = UserController;
