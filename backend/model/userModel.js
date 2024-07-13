const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 8,
        validate: function () {
            this.password === this.confirmPassword
        }
    },
    role: {
        type: String,
        default: "user"
    },
    otp: String,
    otpExpiry: Date
})

const User = new mongoose.model('UserModel', userSchema)

module.exports = User