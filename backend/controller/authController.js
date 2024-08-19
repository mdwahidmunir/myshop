const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const dotenv = require('dotenv')
const User = require('../model/userModel')
const emailHelper = require('../utils/mailer')
const generateOTP = require('../utils/otpGenerator')
const { WELCOME_TEMPLATE, OTP_TEMPLATE } = require('../utils/templates')
const { sanitizeUser } = require('../utils/helpers/_helper')

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

            const cookieConfig = {
                httpOnly: process.env.NODE_ENV === 'production',
                secure: process.env.NODE_ENV === 'production',
            }
            if (process.env.NODE_ENV === 'production')
                cookieConfig['sameSite'] = 'Lax'

            const authToken = jwt.sign({ id: newUser._id }, JWT_SECRET)
            res.cookie('jwt', authToken, {
                ...cookieConfig,
                maxAge: 1000 * 60 * 2
            });

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
                    const cookieConfig = {
                        httpOnly: process.env.NODE_ENV === 'production',
                        secure: process.env.NODE_ENV === 'production',
                    }
                    if (process.env.NODE_ENV === 'production')
                        cookieConfig['sameSite'] = 'Lax'

                    const authToken = jwt.sign({ id: user._id }, JWT_SECRET)
                    res.cookie('jwt', authToken, {
                        ...cookieConfig,
                        maxAge: 1000 * 60 * 5
                    });
                    return res.status(200).json({
                        status: "success",
                        response: authToken
                    })

                }
                catch (err) {
                    return res.status(500).json({
                        status: "failure",
                        error: err.message
                    })
                }
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

const logout = (req, res) => {
    try {
        res.clearCookie('jwt', { path: '/' }); // This clears the cookie
        return res.status(200).json({
            status: "success",
            response: "Logged out successfull"
        })
    }
    catch (err) {
        return res.status(500).json({
            status: "failure",
            error: err.message
        })
    }
}


const sendOTP = async (req, res) => {
    const { email } = req.body
    try {
        if (!email)
            throw new Error("Email is empty")

        const otpTenureInSecs = 60 * 5 // in secs 
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
        return res.status(500).json({
            status: 'failure',
            error: err.message,
        });
    }
}



const passwordReset = async (req, res) => {
    try {
        const { email, password, confirmPassword, otp } = req.body

        // CASE I : When the fields are empty
        if (!(email && password && confirmPassword && otp))
            return res.status(400).json({
                status: 'failure',
                error: 'Fields cannot be left empty'
            })

        const user = await User.findOne({ email })

        // CASE II : When the email provided does not match in DB
        // Purposely setting as OTP validation so that hackers are not aware that the email provided is wrong
        if (!user)
            return res.status(400).json({
                status: 'failure',
                error: 'OTP validation failed'
            })

        // CASE III : When the OTP provided with otp's tenure
        let currentTime = new Date()
        if (currentTime < user.otpExpiry) {

            // CASE III a : When OTP provide is a wrong OTP
            if (otp !== user.otp)
                return res.status(400).json({
                    status: 'failure',
                    error: 'OTP validation failed'
                })

            // CASE III b : When OTP provide is a correct OTP
            crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', async (err, hashedPassword) => {

                try {
                    if (err) throw err

                    //Reseting the OTP and updating the password

                    toUpdate = { password: hashedPassword, confirmPassword, otp: null, otpExpiry: null }
                    const updatedUser = await User.findByIdAndUpdate(user._id, toUpdate, { new: true }).lean()

                    return res.status(200).json({
                        status: "success",
                        response: {
                            message: "Password Reset successful !",
                            user: sanitizeUser(updatedUser)
                        }
                    })
                }
                catch (err) {
                    return res.status(400).json({
                        status: "failure",
                        error: err.message
                    })
                }
            });
        }
        // CASE IV : When the OTP provided is expired
        else
            return res.status(400).json({
                status: 'failure',
                error: 'OTP expired'
            })
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
    logout,
    sendOTP,
    passwordReset,
    exampleProtectedPath,
    exampleAdminPath
}
