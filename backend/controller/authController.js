const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const User = require('../model/userModel')
const emailHelper = require('../utils/mailer')
const generateOTP = require('../utils/otpGenerator')
const promisify = require('util').promisify
const { WELCOME_TEMPLATE, OTP_TEMPLATE } = require('../utils/templates')

dotenv.config()
const promisifiedJWTSign = promisify(jwt.sign)
const promisifiedJWTVerify = promisify(jwt.verify)
const { JWT_SECRET } = process.env

const signup = async (req, res) => {
    try {

        const body = req.body
        const newUser = await User.create(body)
        res.status(201).json({
            status: "success",
            response: newUser
        })
        await emailHelper(WELCOME_TEMPLATE, newUser.email, { username: newUser.name })
    }
    catch (err) {
        return res.status(400).json({
            status: "failure",
            error: err.message
        })
    }
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

            if (!user || user?.password !== password)
                return res.status(400).json({
                    status: "failure",
                    error: "Email or Password does not match"
                })


            if (password === user.password) {
                const authToken = await promisifiedJWTSign({ id: user._id }, JWT_SECRET)
                res.cookie('jwt', authToken, { maxAge: 1000 * 60 * 60 * 24 }) // 24 Hrs
                return res.status(200).json({
                    status: "success",
                    response: authToken
                })
            }
        }
    }
    catch (err) {
        return res.status(502).json({
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
    exampleProtectedPath,
    exampleAdminPath
}
