import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { BadRequestError } from '../helpers/apiError'
import Admin from '../models/Admin'
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

export const loginAdmin = async (req: Request, res: Response) => {
  const foundAdmin = await Admin.findOne({ email: req.body.email })

  if (!foundAdmin) {
    throw new BadRequestError('Wrong email or password.')
  }

  bcrypt.compare(
    req.body.password,
    foundAdmin.password,
    function (err, result) {
      if (result) {
        const token = jwt.sign(
          {
            adminId: foundAdmin._id,
            firstname: foundAdmin.firstname,
            lastname: foundAdmin.lastname,
            email: foundAdmin.email,
            roles: foundAdmin.roles,
          },
          JWT_SECRET,
          {
            expiresIn: '1h',
          }
        )
        const resAdmin = {
          adminId: foundAdmin._id,
          roles: foundAdmin.roles,
        }
        res.json({ token, resAdmin })
      } else {
        throw new BadRequestError('Wrong email or password.')
      }
    }
  )
}
