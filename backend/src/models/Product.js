const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        tolowercase: true
    },
    category: {
        type: String,
        required: true,
        tolowercase: true
    },
    description: {
        type: String,
        tolowercase: true
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    image: {
        type: String
    }
}, { timestamps: true })


const Product = mongoose.model('product', productSchema)

module.exports = Product