// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    price_sign: {
        type: String,
        default: "$"
    },
    currency: {
        type: String,
        default: "USD"
    },
    image_link: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    rating: {
        type: Number,
        default: 5,
        min: 0,
        max: 5
    },
    category: {
        type: String
    },
    product_type: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('Product', productSchema);
