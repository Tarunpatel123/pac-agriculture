const User = require("../models/user");
const Visit = require("../models/visit");
const Share = require("../models/share");
const Contact = require("../models/contact");
const Material = require("../models/material");

const getAdminStats = async (req, res) => {
  console.log('Admin Stats request received');
  try {
    const secretKey = req.headers['x-admin-secret'];
    console.log('Secret key from header:', secretKey ? 'Provided' : 'Missing');
    
    // Simple secret key check (In a real app, use JWT)
    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      console.warn('Unauthorized admin access attempt with key:', secretKey);
      return res.status(401).json({ message: "Unauthorized access" });
    }

    console.log('Fetching data from database...');
    const [enrollments, registeredUsers, visits, shares, contacts, materials] = await Promise.all([
      User.find({ userType: { $ne: 'registered' } }).sort({ createdAt: -1 }),
      User.find({ userType: 'registered' }).sort({ createdAt: -1 }),
      Visit.find().sort({ createdAt: -1 }),
      Share.find().populate('userId', 'fullName email mobileNumber').sort({ createdAt: -1 }),
      Contact.find().sort({ createdAt: -1 }),
      Material.find().sort({ createdAt: -1 })
    ]);
    console.log(`Fetched: ${enrollments.length} enrollments, ${registeredUsers.length} registered users`);
    console.log('Data fetched successfully');

    const stats = {
      totalEnrollments: enrollments.length,
      totalRegistered: registeredUsers.length,
      totalVisits: visits.length,
      totalShares: shares.length,
      totalContacts: contacts.length,
      totalMaterials: materials.length,
      enrollments,
      registeredUsers,
      visits,
      shares,
      contacts,
      materials
    };

    res.status(200).json(stats);
  } catch (error) {
    console.error("Admin Stats Error:", error);
    res.status(500).json({ error: "Failed to fetch admin statistics", details: error.message });
  }
};

module.exports = { getAdminStats };
