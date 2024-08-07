const User = require('../model/userModel')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { sanitizeUser } = require('../utils/helpers/_helper')

dotenv.config()
const { JWT_SECRET } = process.env

const createUser = async (req, res) => {
    const body = req.body
    try {
        const doc = await User.create(body)
        return res.status(200).json({
            status: "success",
            response: doc
        })
    }
    catch (err) {
        return res.status(400).json({
            status: "failure",
            response: err.message
        })
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({
            status: "success",
            response: users
        })
    }
    catch (err) {
        return res.status(400).json({
            status: "failure",
            error: err.message
        })
    }
}

const getUser = async (req, res) => {
    try {
        const token = req.cookies.jwt
        if (!token)
            return res.status(403).json({
                status: "failure",
                response: "Authentication Failed"
            })

        const { id } = jwt.verify(token, JWT_SECRET)
        const user = await User.findOne({ _id: id }).lean()

        if (!user)
            return res.status(400).json({
                status: "failure",
                response: "User not found"
            })

        return res.status(200).json({
            status: "success",
            response: sanitizeUser(user)
        })

    }
    catch (err) {
        return res.status(500).json({
            status: "failure",
            error: err.message
        })
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findOne({ _id: id })
        if (!user)
            throw new Error("User not found")
        return res.status(200).json({
            status: "success",
            response: user
        })
    }
    catch (err) {
        return res.status(400).json({
            status: "failure",
            error: err.message
        })
    }
}

const updateUserById = async (req, res) => {
    try {
        const { id } = req.params
        const toUpdate = req.body

        const updatedUser = await User.findByIdAndUpdate(id, toUpdate, { new: true })
        if (!updatedUser)
            throw new Error("User not found")
        return res.status(400).json({
            status: "success",
            response: updatedUser
        })
    }
    catch (err) {
        return res.status(400).json({
            status: "failure",
            error: err.message
        })
    }
}

module.exports = {
    getUsers,
    getUserById,
    getUser,
    createUser,
    updateUserById
}