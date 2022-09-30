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

const router = express.Router()

// Every path we define here will get /api/v1/products prefix
router.post('/', validate(productCreateSchema), createProduct)
router.get('/', findAll)
router.get('/:productId', findById)
router.put('/:productId', updateProduct)
router.delete('/:productId', deleteProduct)

export default router
