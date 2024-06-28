const { getAllProducts, createProduct } = require('../controller/productController')
const express = require('express');

const productRouter = express.Router();

productRouter.get('/', getAllProducts).post('/', createProduct);

module.exports = productRouter