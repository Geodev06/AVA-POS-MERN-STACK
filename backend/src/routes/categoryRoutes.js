const express = require('express')
const CategoryController = require('../controller/categoryController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.get('/', requireAuth, CategoryController.index)

router.get('/:id', requireAuth, CategoryController.show)

router.post('/store', requireAuth, CategoryController.store)

router.get('/edit/:id', requireAuth, CategoryController.edit)

router.patch('/update/:id', requireAuth, CategoryController.update)

router.delete('/destroy/:id', requireAuth, CategoryController.destroy)

module.exports = router