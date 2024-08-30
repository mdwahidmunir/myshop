const jwt = require('jsonwebtoken')
const Orders = require("../model/ordersModel");
const dotenv = require("dotenv")

dotenv.config()
const { JWT_SECRET } = process.env

const createOrder = async (req, res) => {
    try {

        const token = req.cookies.jwt
        if (!token)
            return res.status(403).json({
                status: "failure",
                error: "Authentication Failed"
            })

        const { id } = jwt.verify(token, JWT_SECRET)

        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = req.body;

        if (orderItems && orderItems.length === 0) {
            return res.status(403).json({
                status: "failure",
                error: "Order Items cannot be 0 when creating order"
            })
        }

        else {


            const order = await Orders.create({
                user: id,
                orderItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
            });

            return res.status(200).json({
                status: "success",
                response: order.orderId
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


const getOrders = async (req, res) => {
    try {
        const token = req.cookies.jwt
        if (!token)
            return res.status(403).json({
                status: "failure",
                error: "Authentication Failed"
            })

        const { id } = jwt.verify(token, JWT_SECRET)

        const orders = await Orders
            .find({ user: id })
            .populate('orderItems.product', '-_id')
            .populate('user', 'name email -_id')
            .sort({ createdAt: -1 })
            .lean()

        return res.status(200).json({
            status: "success",
            response: orders
        })
    }
    catch (err) {
        return res.status(500).json({
            status: "failure",
            error: err.message
        })
    }
}

module.exports = { createOrder, getOrders }
