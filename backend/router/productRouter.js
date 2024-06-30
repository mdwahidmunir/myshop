const { getAllProducts, createProduct, getProductById } = require('../controller/productController')
const express = require('express');

const productRouter = express.Router();

productRouter
    .get('/', getAllProducts)
    .post('/', createProduct);

productRouter
    .get('/:id', getProductById);

module.exports = productRouter