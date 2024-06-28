const Product = require("../model/productModel")

const getAllProducts = async (req, res) => {
    const products = await Product.find({});
    return res.json(products)
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
    createProduct
}