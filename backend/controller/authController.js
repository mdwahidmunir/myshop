const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const dotenv = require('dotenv')
const User = require('../model/userModel')
const emailHelper = require('../utils/mailer')
const generateOTP = require('../utils/otpGenerator')
const { WELCOME_TEMPLATE, OTP_TEMPLATE } = require('../utils/templates')

dotenv.config()
const { JWT_SECRET } = process.env

const signup = async (req, res) => {

    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async (err, hashedPassword) => {

        try {
            if (err) throw err

            const body = req.body
            const newUser = await User.create({
                ...body,
                password: hashedPassword,
                salt
            })
            const authToken = jwt.sign({ id: newUser._id }, JWT_SECRET)
            res.cookie('jwt', authToken, { maxAge: 1000 * 15 })

            const { name, email } = newUser
            const apiResponse = { name, email, authToken }
            res.status(201).json({
                status: "success",
                response: apiResponse,
            })
            await emailHelper(WELCOME_TEMPLATE, newUser.email, { username: newUser.name })
        }
        catch (err) {
            if (err.code === 11000)
                err.message = "Email already exists "
            return res.status(400).json({
                status: "failure",
                error: err.message
            })
        }
    });
}

const login = async (req, res) => {
    try {

        const userDetails = req.body
        const { email, password } = userDetails

        if (!email || !password)
            return res.status(400).json({
                status: "failure",
                error: "Email or Password does not match"
            })

        if (email) {
            const user = await User.findOne({ email: email })

            if (!user)
                return res.status(403).json({
                    status: "failure",
                    error: "Email or Password does not match"
                });

            crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function (err, hashedPassword) {

                try {
                    if (err) {
                        return res.status(502).json({
                            status: "failure",
                            error: err.message
                        })
                    }

                    if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
                        return res.status(403).json({
                            status: "failure",
                            error: "Email or Password does not match"
                        });
                    }

                    // Password is valid here
                    const authToken = jwt.sign({ id: user._id }, JWT_SECRET)
                    res.cookie('jwt', authToken, { maxAge: 1000 * 60 * 2 }) // miliSec * sec * min * hr * day
                    return res.status(200).json({
                        status: "success",
                        response: authToken
                    })

                }
                catch (err) {
                    return res.status(502).json({
                        status: "failure",
                        error: err.message
                    })
                }
            });
        }
    }
    catch (err) {
        return res.status(502).json({
            status: "failure",
            error: err.message
        })
    }
}


const sendOTP = async (req, res) => {
    try {
        const { email } = req.body
        try {
            if (!email)
                throw new Error("Email is empty")

            const otpTenureInSecs = 60 * 0.5 // in secs 
            const user = await User.findOne({ email })

            // Here we are purposely setting status 200 so as to not allow the hackers trial and error of mails.
            // Though we show mail sent but we will not send the mail as there is no point in sending to unregistered mail
            if (!user)
                return res.status(200).json({
                    status: "success",
                    response: {
                        message: "Mail sent to the registered mail",
                        tenure: otpTenureInSecs
                    }
                })

            const username = user.name;
            const otp = await generateOTP(7);
            user.otp = otp;
            user.otpExpiry = new Date(Date.now() + 1000 * otpTenureInSecs);
            await user.save();

            await emailHelper(OTP_TEMPLATE, email, { username, otp });

            return res.status(200).json({
                status: 'success',
                response: {
                    message: 'Mail sent to the registered mail',
                    tenure: otpTenureInSecs,
                },
            });

        }
        catch (err) {
            console.error('Send OTP Error:', err.message);
            return res.status(400).json({
                status: 'failure',
                error: err.message,
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            status: "failure",
            error: err.message
        })
    }
}


const exampleProtectedPath = async (req, res) => {
    return res.status(200).json({
        status: "success",
        response: "In Sample Path"
    })
}

const exampleAdminPath = async (req, res) => {
    return res.status(200).json({
        status: "success",
        response: "In Admin Path"
    })
}

module.exports = {
    signup,
    login,
    sendOTP,
    exampleProtectedPath,
    exampleAdminPath
}
