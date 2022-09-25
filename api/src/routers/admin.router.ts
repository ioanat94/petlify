import express from 'express'
import { adminCreateSchema } from '../middlewares/validateForms'
import { validate } from '../middlewares/validateForms'

import {
  createAdmin,
  deleteAdmin,
  findAll,
  findById,
  updateAdmin,
} from '../controllers/admin.controller'

const router = express.Router()

// Every path we define here will get /api/v1/admins prefix
router.post('/', validate(adminCreateSchema), createAdmin)
router.get('/', findAll)
router.get('/:adminId', findById)
router.put('/:adminId', updateAdmin)
router.delete('/:adminId', deleteAdmin)

export default router
