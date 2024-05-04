//  Author -
// Vishnu Vasita
const express = require('express');
const router = express.Router();
const { userLogin, userSignup, getUserProfile, updateUserProfile, forgotPassword, confirmCode, changePassword } = require('./../controllers/userController');
const userAuth = require('../middleware/auth')

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/user/:id', userAuth, getUserProfile);
router.put('/user/update/:id',  userAuth, updateUserProfile);
router.post('/user/forgotpassword', forgotPassword);
router.post('/user/confirmCode',  confirmCode);
router.put('/user/changepassword', changePassword);

module.exports = router;
