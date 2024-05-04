// Multiple Author -
// Shreya Kapoor
// Vishnu Vasita
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require("dotenv");
const nodemailer = require('nodemailer');
const moment = require("moment")

dotenv.config();

const userSignup = async (req, res) => {
    const { firstName, lastName, email, contactNo, password } = req.body;
    const { dateOfBirth, tempKey } = "";
    const income = 0

    try {

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            firstName,
            lastName,
            email,
            contactNo,
            password: hashedPassword,
            contactNo,
            dateOfBirth,
            income,
            tempKey
        });

        await user.save();

        jwt.sign({
            userId: user.id
        }, process.env.JWT_ACCESS_KEY,
        { 
            expiresIn: '40h' 
        }, (err) => {
            if (err) throw err;
            res.status(200).json({ message: 'Signup successful' });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        console.log(process.env.JWT_ACCESS_KEY)
        jwt.sign( {userId: user.id}, process.env.JWT_ACCESS_KEY, { expiresIn: '40h' }, (err, token) => {
            if (err) throw err;
            
            res.status(200).json({
                message: "login successful",
                id: user.id,
                token
            });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User with this email not found' });
        }
        console.log("user controller user.isSubscribed", user.isSubscribed);
    

        res.status(200).json({ user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const { firstName, lastName, email, contactNo, dateOfBirth, income } = req.body;

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        if (email !== user.email) {
            const existingUser = await User.findOne({ email, _id: { $ne: userId } });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists' });
            }
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;
        user.contactNo = contactNo || user.contactNo;
        user.dateOfBirth = dateOfBirth || user.dateOfBirth;
        user.income = income || user.income;

        await user.save();

        res.status(200).json({ message: 'User profile updated successfully', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const  forgotPassword = async (req, res) =>{
    const email  = req.body.email;

    console.log(email);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

      
        const tempKey = Math.random().toString(36).substr(2, 10);


        user.tempKey = tempKey;
        await user.save();

    
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_EMAIL, 
                pass:  process.env.MAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.MAIL_EMAIL,
            to: email,
            subject: 'Password Reset Request',
            text: `Your temporary key for password reset is: \n ${tempKey}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Error sending email' });
            }
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: `Temporary key sent to your ${email}` });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const confirmCode = async(req, res) => {
    const email = req.body.email;
    const tempKey = req.body.tempKey;
    
    try {
        const user = await User.findOne({ email, tempKey });

        if (user) {
            user.tempKey = null;
            user.save();
            res.status(200).send('Code matched');
            
        } else {
            res.status(400).send('Code does not match.');
        }
    } catch (error) {
        console.error('Error confirming code:', error);
        res.status(500).send('Error confirming code.');
    }

}

const changePassword = async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;


    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send('User not found.');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).send('Password updated successfully.');
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).send('Error changing password.');
    }
}



module.exports = {
    userSignup,
    userLogin,
    getUserProfile,
    updateUserProfile,
    forgotPassword,
    confirmCode,
    changePassword
};
