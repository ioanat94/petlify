import express from 'express'
import passport from 'passport'

import { login } from '../controllers/auth.controller'

const router = express.Router()

// Every path we define here will get /api/v1/auth prefix
router.post(
  '/login',
  passport.authenticate('google-id-token', { session: false }),
  login
)

export default router
