const Product = require("../model/productModel")

const getAllProducts = async (req, res) => {
    try {

        const products = await Product.find({})
        return res.status(200).json({
            status: "success",
            response: products
        })
    }
    catch (err) {
        return res.status(502).json({
            status: "failure",
            error: err
        })
    }
}

const getProductById = async (req, res) => {
    try {

        const { id } = req.params
        const product = await Product.findOne({ _id: id })
        return res.status(200).json({
            status: "success",
            response: product
        })
    }
    catch (err) {
        return res.status(502).json({
            status: "failure",
            error: err
        })
    }
}

const createProduct = async (req, res) => {
    const body = req.body;
    try {
        const doc = await Product.create(body);
        return res.status(201).json({
            status: "success",
            response: doc
        })
    }
    catch (err) {
        return res.status(502).json({
            status: "failure",
            error: err
        })
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    getProductById
}