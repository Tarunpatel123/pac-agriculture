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
    let location = 'Unknown';

    // Fetch Geo Location for distance
    try {
      let fetchIp = ip;
      if (fetchIp === '127.0.0.1' || fetchIp === '::1') fetchIp = '27.7.0.1'; // Test IP
      
      const geoResponse = await axios.get(`http://ip-api.com/json/${fetchIp}`);
      if (geoResponse.data.status === 'success') {
        const { city, regionName, lat, lon } = geoResponse.data;
        location = `${city}, ${regionName}`;
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
        location
      };

      const newUser = await userService.createUser(inserData);

      // SMTP Transporter Configuration
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });


      const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.RECEIVER_EMAIL,
        subject: "New Student Enrollment - PAC Agriculture",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px;">
            <h2 style="color: #2e7d32;">New Student Enrollment Received</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Full Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${fullName}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Mobile:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${mobileNumber}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Class:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${currentClass}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Course:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${interested_Course}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Instagram ID:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${instagramId || 'Not provided'}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #1976d2;"><strong>Location:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #1976d2;">${location}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #1976d2;"><strong>Distance:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #1976d2;">${distance ? distance + ' KM' : 'N/A'}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Referrer:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${referrer}</td></tr>
            </table>
          </div>
        `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Email Error:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });

      res.status(201).json(newUser);

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
