const express = require('express')
const CategoryController = require('../controller/categoryController')
const router = express.Router()

router.get('/', CategoryController.index)

router.get('/:id', CategoryController.show)

router.post('/store', CategoryController.store)

router.get('/edit/:id', CategoryController.edit)

router.patch('/update/:id', CategoryController.update)

router.delete('/destroy/:id', CategoryController.destroy)

module.exports = router