import express from 'express'

import checkAuth from '../middlewares/checkAuth'
import {
  createUser,
  deleteUser,
  findAll,
  findById,
  updateUser,
} from '../controllers/user.controller'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix
router.post('/', createUser)
router.get('/', checkAuth, findAll)
router.get('/:userId', checkAuth, findById)
router.put('/:userId', checkAuth, updateUser)
router.delete('/:userId', checkAuth, deleteUser)

export default router
