const Product = require("../model/productModel")
const { PAGE, PAGE_LIMIT } = require("../utils/constants")

const getAllProducts = async (req, res) => {
    try {

        const products = await Product.find({})
        return res.status(200).json({
            status: "success",
            response: products
        })
    }
    catch (err) {
        return res.status(400).json({
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
        return res.status(400).json({
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
        return res.status(400).json({
            status: "failure",
            error: err
        })
    }
}

const getProducts = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || PAGE
        const limit = parseInt(req.query.limit) || PAGE_LIMIT
        const sort = req.query.sort || null
        const brand = req.query.brand || null;
        const category = req.query.category || null;

        const skip = (page - 1) * limit

        let query = {}
        if (brand) {
            query.brand = brand;
        }

        if (category) {
            query.category = category;
        }

        let products

        if (sort) {
            const sortParam = sort.split('_')[0]
            const sortValue = sort.split('_')[1]
            const sortOrder = sortValue === 'asc' ? 1 : -1

            products = await Product.find(query)
                .sort({ [sortParam]: sortOrder })
                .skip(skip)
                .limit(limit)
                .lean();
        }
        else
            products = await Product.find(query).skip(skip).limit(limit).lean()

        const totalItems = await Product.countDocuments(query)
        const totalPage = Math.ceil(totalItems / limit)

        return res.status(200).json({
            status: "success",
            page,
            totalItems,
            totalPage,
            response: products

        })
    }
    catch (err) {
        return res.status(500).json({
            status: "failure",
            error: err.message

        })
    }


}

module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
    getProducts
}