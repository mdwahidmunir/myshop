const { getAllProducts, createProduct, getProductById, getProducts } = require('../controller/productController')
const express = require('express');

const productRouter = express.Router();

productRouter
    .get('/', getProducts)
    .post('/', createProduct);

productRouter
    .get('/:id', getProductById);

module.exports = productRouter