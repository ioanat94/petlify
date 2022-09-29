import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secrets'

import { ForbiddenError } from '../helpers/apiError'

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization
    if (authHeader) {
      const token = authHeader.split(' ')[1]

      const decodedUser = jwt.verify(token, JWT_SECRET)

      req.user = decodedUser
      return next()
    }
    throw new ForbiddenError()
  } catch (err: any) {
    throw new ForbiddenError()
  }
}
