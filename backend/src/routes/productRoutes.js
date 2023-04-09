const express = require('express')
const ProductController = require('../controller/productController')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

router.get('/', requireAuth, ProductController.index)

router.get('/:id', requireAuth, ProductController.show)

router.post('/store', requireAuth, ProductController.store)

router.get('/edit/:id', requireAuth, ProductController.edit)

router.patch('/update/:id', requireAuth, ProductController.update)

router.delete('/destroy/:id', requireAuth, ProductController.destroy)

module.exports = router