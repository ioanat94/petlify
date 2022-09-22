import express from 'express'

import {
  createUser,
  // deleteProduct,
  // findAll,
  // findById,
  // updateProduct,
} from '../controllers/user.controller'

const router = express.Router()

// Every path we define here will get /api/v1/products prefix
router.post('/', createUser)
// router.get('/', findAll)
// router.get('/:productId', findById)
// router.put('/:productId', updateProduct)
// router.delete('/:productId', deleteProduct)

export default router
