const jwt = require('jsonwebtoken')
const Shipping = require('../model/shippingModel')
const dotenv = require('dotenv')
const { response } = require('express')
const { sanitizeShippingDetails } = require('../utils/helpers/_helper')

dotenv.config()
const { JWT_SECRET } = process.env

const getShippingInfo = async (req, res) => {
    try {
        const token = req.cookies.jwt
        if (!token)
            return res.status(403).json({
                status: "failure",
                error: "Authentication Failed"
            })

        const { id } = jwt.verify(token, JWT_SECRET)

        const shippingDetails = await Shipping.findOne({ userId: id }).lean()

        return res.status(200).json({
            status: "success",
            response: !shippingDetails ? {} : sanitizeShippingDetails(shippingDetails)
        })
    }
    catch (err) {
        return res.status(500).json({
            status: "failure",
            error: err.message
        })
    }
}

const createOrUpdateShipping = async (req, res) => {
    try {

        const token = req.cookies.jwt
        if (!token)
            return res.status(403).json({
                status: "failure",
                error: "Authentication Failed"
            })


        const toUpdate = req.body
        if (!toUpdate || Object.keys(toUpdate).length === 0)
            return res.status(400).json({
                status: "failure",
                error: "Empty fields not allowed"
            })

        const { id } = jwt.verify(token, JWT_SECRET)
        const shippingDetails = await Shipping.findOneAndUpdate(
            { userId: id },
            toUpdate,
            { new: true, upsert: true, runValidators: true }
        ).lean()

        return res.status(200).json({
            status: "success",
            response: sanitizeShippingDetails(shippingDetails)
        })
    }
    catch (err) {
        return res.status(500).json({
            status: "failure",
            error: err.message
        })
    }
}

module.exports = { getShippingInfo, createOrUpdateShipping }