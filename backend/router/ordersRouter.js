const express = require('express')
const passport = require("passport");
const { createOrder, getOrders, getOrderById } = require('../controller/ordersController')



ordersRouter = express.Router()

ordersRouter
    .get('/', passport.authenticate("jwt", { session: false }), getOrders)
    .post('/', passport.authenticate("jwt", { session: false }), createOrder)

ordersRouter
    .get('/:id', getOrderById)


module.exports = ordersRouter