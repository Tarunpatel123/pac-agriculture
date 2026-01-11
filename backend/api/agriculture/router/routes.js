const userController = require('../controller/user.controller');
const visitController = require('../controller/visit.controller');
const shareController = require('../controller/share.controller');
const adminController = require('../controller/admin.controller');
const contactController = require('../controller/contact.controller');
const express = require('express');
const router = express.Router();  

// User Registration
router.post('/register', userController.createUser);

// Visit Tracking
router.post('/track-visit', visitController.trackVisit);

// Share Tracking
router.post('/track-share', shareController.trackShare);

// Contact Messages
router.post('/contact', contactController.submitContact);

// Admin Routes
router.get('/admin/stats', adminController.getAdminStats);
router.patch('/admin/enrollment/:id/status', userController.updateStatus);
router.delete('/admin/enrollment/:id', userController.deleteUser);
router.delete('/admin/contact/:id', contactController.deleteContact);

module.exports = router;