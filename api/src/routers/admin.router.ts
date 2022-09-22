import express from 'express'

import {
  createAdmin,
  // deleteUser,
  findAll,
  findById,
  // updateUser,
} from '../controllers/admin.controller'

const router = express.Router()

// Every path we define here will get /api/v1/admins prefix
router.post('/', createAdmin)
router.get('/', findAll)
router.get('/:adminId', findById)
// router.put('/:userId', updateUser)
// router.delete('/:userId', deleteUser)

export default router
