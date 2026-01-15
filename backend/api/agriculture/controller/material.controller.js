const Material = require("../models/material");

const createMaterial = async (req, res) => {
  try {
    const { title, description, fileUrl, category, isPublished } = req.body;
    
    const material = await Material.create({
      title,
      description,
      fileUrl,
      category,
      isPublished
    });

    res.status(201).json({ success: true, material });
  } catch (error) {
    console.error("Create Material Error:", error);
    res.status(500).json({ success: false, message: "Failed to create material" });
  }
};

const getPublishedMaterials = async (req, res) => {
  try {
    const { category } = req.query;
    const query = { isPublished: true };
    if (category) query.category = category;

    const materials = await Material.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, materials });
  } catch (error) {
    console.error("Get Materials Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch materials" });
  }
};

const getAllMaterialsAdmin = async (req, res) => {
  try {
    const secretKey = req.headers['x-admin-secret'];
    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const materials = await Material.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, materials });
  } catch (error) {
    console.error("Admin Get Materials Error:", error);
    res.status(500).json({ success: false });
  }
};

const updateMaterial = async (req, res) => {
  try {
    const secretKey = req.headers['x-admin-secret'];
    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;
    const material = await Material.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!material) return res.status(404).json({ message: "Not found" });

    res.status(200).json({ success: true, material });
  } catch (error) {
    console.error("Update Material Error:", error);
    res.status(500).json({ success: false });
  }
};

const deleteMaterial = async (req, res) => {
  try {
    const secretKey = req.headers['x-admin-secret'];
    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;
    await Material.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("Delete Material Error:", error);
    res.status(500).json({ success: false });
  }
};

const trackDownload = async (req, res) => {
    try {
        const { id } = req.params;
        await Material.findByIdAndUpdate(id, { $inc: { downloadCount: 1 } });
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false });
    }
};

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Construct the file URL
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? `https://${req.get('host')}` 
      : `http://localhost:${process.env.PORT || 5000}`;
    
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

    res.status(200).json({ 
      success: true, 
      fileUrl,
      fileName: req.file.filename 
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
};

module.exports = {
  createMaterial,
  getPublishedMaterials,
  getAllMaterialsAdmin,
  updateMaterial,
  deleteMaterial,
  trackDownload,
  uploadFile
};
