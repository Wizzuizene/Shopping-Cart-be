// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    country: {
        type: String
    },
    address: {
        type: String
    },
    role: {
        type: String,
        default: "user"
    },
    otp: {
        type: String,
        default: null
    },
    verify: {
        type: Boolean,
        default: false
    }

});

module.exports = mongoose.model('User', userSchema);
