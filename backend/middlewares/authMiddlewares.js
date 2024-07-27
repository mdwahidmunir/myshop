const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const User = require('../model/userModel')
const promisify = require('util').promisify

dotenv.config()
const { JWT_SECRET } = process.env
const promisifiedJWTVerify = promisify(jwt.verify)

const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt

        if (!token)
            return res.status(403).json({
                status: "failure",
                error: "Token not found"
            })
        else {
            const payload = await promisifiedJWTVerify(token, JWT_SECRET)
            req.userId = payload.id
            next()
        }
    }
    catch (err) {
        res.status(500).json({
            status: "failure",
            response: `Authorization Failed with error ${err.message}`
        })
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const id = req.userId

        if (!id)
            return res.status(400).json({
                status: 'failure',
                error: 'You are not logged in'
            })
        else {
            const user = await User.findOne({ _id: id })
            if (user.role === "admin")
                next()
            else
                res.status(400).json({
                    status: 'failure',
                    error: 'You are not an admin'
                })
        }
    }
    catch (err) {
        return res.status(500).json({
            status: "failure",
            error: err.message
        })
    }
}

module.exports = {
    protectedRoute,
    isAdmin
}