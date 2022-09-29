import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secrets'

export const login = async (req: Request, res: Response) => {
  const user: any = req.user

  const token = jwt.sign(
    {
      userId: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      image: user.image,
      isBanned: user.isBanned,
    },
    JWT_SECRET,
    {
      expiresIn: '1h',
    }
  )
  res.json({ token, user })
}
