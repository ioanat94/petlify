import express from 'express'
import checkAuth from '../middlewares/checkAuth'

import {
  createOrder,
  deleteOrder,
  findAll,
  findById,
  updateOrder,
} from '../controllers/order.controller'

const router = express.Router()

// Every path we define here will get /api/v1/orders prefix
router.post('/', createOrder)
router.get('/', findAll)
router.get('/:orderId', findById)
router.put('/:orderId', checkAuth, updateOrder)
router.delete('/:orderId', checkAuth, deleteOrder)

export default router
