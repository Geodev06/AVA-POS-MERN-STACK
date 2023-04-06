const express = require('express')
const ProductController = require('../controller/productController')
const router = express.Router()

router.get('/', ProductController.index)

router.get('/:id', ProductController.show)

router.post('/store', ProductController.store)

router.get('/edit/:id', ProductController.edit)

router.patch('/update/:id', ProductController.update)

router.delete('/destroy/:id', ProductController.destroy)

module.exports = router