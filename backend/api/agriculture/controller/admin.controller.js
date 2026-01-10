const User = require("../models/user");
const Visit = require("../models/visit");
const Share = require("../models/share");

const getAdminStats = async (req, res) => {
  try {
    const secretKey = req.headers['x-admin-secret'];
    
    // Simple secret key check (In a real app, use JWT)
    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const enrollments = await User.find().sort({ createdAt: -1 });
    const visits = await Visit.find().sort({ createdAt: -1 });
    const shares = await Share.find().sort({ createdAt: -1 });

    const stats = {
      totalEnrollments: enrollments.length,
      totalVisits: visits.length,
      totalShares: shares.length,
      enrollments,
      visits,
      shares
    };

    res.status(200).json(stats);
  } catch (error) {
    console.error("Admin Stats Error:", error);
    res.status(500).json({ error: "Failed to fetch admin statistics" });
  }
};

module.exports = { getAdminStats };
