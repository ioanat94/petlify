import express from 'express'

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
router.get('/', findAll)
router.get('/:userId', findById)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)

export default router
