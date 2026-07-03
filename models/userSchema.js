const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,   
        tolowercase: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        default: ''
    },
    expireOTP: {
        type: Date,
        default: ''
    },
    isverified: {
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model("User", userSchema);