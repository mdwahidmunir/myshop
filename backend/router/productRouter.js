const { getAllProducts, createProduct, getProductById, getProducts, getProductFilters } = require('../controller/productController')
const express = require('express');

const productRouter = express.Router();

productRouter
    .get('/filters', getProductFilters)

productRouter
    .get('/', getProducts)
    .post('/', createProduct);

productRouter
    .get('/:id', getProductById);

module.exports = productRouter