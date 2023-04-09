const Product = require('../models/Product')
const productValidator = require('../validator/product/productValidator')

/**
 * @Product resouce 
 * 
 */


const index = async (req, res) => {

    try {
        const products = await Product.find({}).sort({ createdAt: -1 })

        res.status(200)
            .json({ products })

    } catch (err) {

        res.status(400).json({ err: err.message })
    }
}

const show = async (req, res) => {
    try {

        const product = await Product.findOne({ _id: req.params.id })

        res.status(200)
            .json({ product })

    } catch (err) {

        res.status(400).json({ err: err.message })

    }
}

const store = async (req, res) => {

    try {
        const { name, category, description, price, image } = req.body

        await productValidator.validateAsync({ name, category, description, price, image })

        const product = await Product.create({ name, category, description, price, image })

        res.status(200)
            .json({ product })

    } catch (err) {

        res.status(400).json({ err: err.message })

    }
}


const edit = async (req, res) => {

    try {

        const product = await Product.findOne({ _id: req.params.id })

        res.status(200)
            .json({ product })

    } catch (err) {

        res.status(400).json({ err: err.message })

    }
}


const update = async (req, res) => {
    try {

        const { name, category, description, price, image } = req.body

        await productValidator.validateAsync({ name, category, description, price, image })


        const product = await Product.updateOne({
            _id: req.params.id
        }, {
            $set: {
                name, category, description, price, image
            }
        }, {
            new: true
        })

        res.status(200)
            .json({ product })

    } catch (err) {

        res.status(400).json({ err: err.message })

    }
}

const destroy = async (req, res) => {
    try {

        const product = await Product.deleteOne({ _id: req.params.id })

        res.status(200)
            .json({ product })


    } catch (err) {

        res.status(400).json({ err: err.message })

    }
}

module.exports = {
    index, show, store, edit, update, destroy
}