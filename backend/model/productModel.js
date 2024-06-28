const mongoose = require('mongoose');

productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    countInStock: {
        type: Number,
        required: true
    },
    numReviews: {
        type: Number,
        required: true
    }
})

const Product = new mongoose.model("ProductModel", productSchema);

module.exports = Product