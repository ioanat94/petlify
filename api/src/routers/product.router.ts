import express from 'express'

import {
  createProduct,
  deleteProduct,
  findAll,
  findById,
  updateProduct,
} from '../controllers/product.controller'

const router = express.Router()

// Every path we define here will get /api/v1/products prefix
router.post('/', createProduct)
router.get('/', findAll)
router.get('/:productId', findById)
router.put('/:productId', updateProduct)
router.delete('/:productId', deleteProduct)

export default router
