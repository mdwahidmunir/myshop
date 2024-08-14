const express = require("express");
const passport = require("passport");
const { getShippingInfo, createOrUpdateShipping } = require("../controller/shippingController");

const shippingRouter = express.Router();

shippingRouter
  .get("/", passport.authenticate("jwt", { session: false }), getShippingInfo)
  .post("/", passport.authenticate("jwt", { session: false }), createOrUpdateShipping);

module.exports = shippingRouter;
