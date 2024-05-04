// Multiple Author -
// Shreya Kapoor
// Vishnu Vasita
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: true 
    },
    lastName: { 
        type: String, 
        required: true 
    },
    contactNo: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    dateOfBirth: { 
        type: Date,
        default: null
    },
    password: {
        type: String,
        required: true
    },
    income: { 
        type: Number,
        default: 0
    },
    isSubscribed: {
        type: Boolean,
        default: false
    },
    tempKey: {
        type: String,
        default: null
    }
});

const User = mongoose.model('users', userSchema);

module.exports = User;
