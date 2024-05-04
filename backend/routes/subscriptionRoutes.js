// Author -
// Shreya Kapoor
const express = require('express');
const router = express.Router();

let {
    createSubscription, 
    handlePaymentSuccess, 
 } = require('./../controllers/subscriptionController');
const userAuth = require('../middleware/auth');

// Route for creating a subscription checkout session
router.post('/create-subscription-checkout-session', userAuth, createSubscription);

// Route for handling successful payment
router.post('/payment-success', userAuth, handlePaymentSuccess);

module.exports = router;
