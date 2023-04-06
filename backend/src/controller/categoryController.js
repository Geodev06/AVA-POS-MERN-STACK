const Category = require('../models/Category')
const categoryValidator = require('../validator/category/categoryValidator')

/**
 * @Category resouce 
 * 
 */


const index = async (req, res) => {

    try {
        const categories = await Category.find({}).sort({ createdAt: -1 })

        res.status(200)
            .json({ categories })

    } catch (err) {

        res.status(500).json({ err: err.message })
    }
}

const show = async (req, res) => {
    try {

        const category = await Category.findOne({ _id: req.params.id })

        res.status(200)
            .json({ category })

    } catch (err) {

        res.status(500).json({ err: err.message })

    }
}

const store = async (req, res) => {
    try {
        const { name, description } = req.body

        await categoryValidator.validateAsync({ name, description })

        const category = await Category.create({ name, description })

        res.status(200)
            .json({ category })

    } catch (err) {

        res.status(500).json({ err: err.message })

    }
}


const edit = async (req, res) => {

    try {

        const category = await Category.findOne({ _id: req.params.id })

        res.status(200)
            .json({ category })

    } catch (err) {

        res.status(500).json({ err: err.message })

    }
}


const update = async (req, res) => {
    try {

        const { name, description } = req.body

        await categoryValidator.validateAsync({ name, description })


        const category = await Category.updateOne({
            _id: req.params.id
        }, {
            $set: {
                name: name,
                description: description
            }
        }, {
            new: true
        })

        res.status(200)
            .json({ category })

    } catch (err) {

        res.status(500).json({ err: err.message })

    }
}

const destroy = async (req, res) => {
    try {

        const category = await Category.deleteOne({ _id: req.params.id })

        res.status(200)
            .json({ category })


    } catch (err) {

        res.status(500).json({ err: err.message })

    }
}

module.exports = {
    index, show, store, edit, update, destroy
}