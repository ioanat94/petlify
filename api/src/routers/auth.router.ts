import express from 'express'
import passport from 'passport'

import { login, loginAdmin } from '../controllers/auth.controller'

const router = express.Router()

// Every path we define here will get /api/v1/auth prefix
router.post(
  '/login',
  passport.authenticate('google-id-token', { session: false }),
  login
)
router.post('/login-admin', loginAdmin)

export default router
