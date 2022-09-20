import express from 'express'

import { createProduct } from '../controllers/product.controller'

const router = express.Router()

// Every path we define here will get /api/v1/products prefix
// router.get('/', findAll)
// router.get('/:movieId', findById)
// router.put('/:movieId', updateMovie)
// router.delete('/:movieId', deleteMovie)
router.post('/', createProduct)

export default router
