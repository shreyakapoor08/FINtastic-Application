// Author -
// Dhrumil Gosaliya
const express = require('express');
const router = express.Router();
const { createSingleNotification, getAllNotifications } = require('./../controllers/notificationController');
const userAuth = require('../middleware/auth');

router.post('/create', userAuth, createSingleNotification);
router.get('/get-all', userAuth, getAllNotifications);

module.exports = router;
