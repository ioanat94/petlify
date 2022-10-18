import express from 'express'

import { productCreateSchema } from '../middlewares/validateForms'
import { validate } from '../middlewares/validateForms'
import {
  createProduct,
  deleteProduct,
  findAll,
  findById,
  updateProduct,
} from '../controllers/product.controller'
import checkAuth from '../middlewares/checkAuth'

const router = express.Router()

// Every path we define here will get /api/v1/products prefix
router.post('/', validate(productCreateSchema), checkAuth, createProduct)
router.get('/', findAll)
router.get('/:productId', findById)
router.put('/:productId', checkAuth, updateProduct)
router.delete('/:productId', checkAuth, deleteProduct)

export default router
