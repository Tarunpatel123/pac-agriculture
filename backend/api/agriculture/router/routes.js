const userController = require('../controller/user.controller');
const visitController = require('../controller/visit.controller');
const shareController = require('../controller/share.controller');
const adminController = require('../controller/admin.controller');
const contactController = require('../controller/contact.controller');
const authController = require('../controller/auth.controller');
const materialController = require('../controller/material.controller');
const upload = require('../config/multer');
const express = require('express');
const router = express.Router();  

// Auth Routes
router.post('/auth/signup', authController.signup);
router.post('/auth/login', authController.login);

// User Registration
router.post('/register', userController.createUser);

// Visit Tracking
router.post('/track-visit', visitController.trackVisit);

// Share Tracking
router.post('/track-share', shareController.trackShare);

// Contact Messages
router.post('/contact', contactController.submitContact);

// Material/Notes Routes
router.get('/materials', materialController.getPublishedMaterials);
router.post('/materials/:id/download', materialController.trackDownload);

// Admin Routes
router.get('/admin/stats', adminController.getAdminStats);
router.patch('/admin/enrollment/:id/status', userController.updateStatus);
router.delete('/admin/enrollment/:id', userController.deleteUser);
router.delete('/admin/contact/:id', contactController.deleteContact);

// Admin Material Management
router.get('/admin/materials', materialController.getAllMaterialsAdmin);
router.post('/admin/materials', materialController.createMaterial);
router.post('/admin/upload', upload.single('file'), materialController.uploadFile);
router.patch('/admin/materials/:id', materialController.updateMaterial);
router.delete('/admin/materials/:id', materialController.deleteMaterial);

module.exports = router;