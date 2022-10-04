import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'

import Admin from '../models/Admin'
import adminService from '../services/admin.service'
import { BadRequestError } from '../helpers/apiError'

// POST /admins
export const createAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstname, lastname, email, password, roles } = req.body

    const admin = new Admin({
      firstname,
      lastname,
      email,
      password,
      roles,
    })

    const saltRounds = 10
    admin.password = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) reject(err)
        resolve(hash)
      })
    })

    await adminService.create(admin)
    res.json(admin)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /admins
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const search = req.query.search

    const admins = await adminService.findAll()
    let adminsRef = [...admins]

    if (search) {
      adminsRef = adminsRef.filter((admin) =>
        admin.email.toLowerCase().includes(search as string)
      )
    }

    res.json(adminsRef)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /admins/:adminId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await adminService.findById(req.params.adminId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /admins/:adminId
export const updateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const adminId = req.params.adminId

    const saltRounds = 10
    update.password = await new Promise((resolve, reject) => {
      bcrypt.hash(update.password, saltRounds, function (err, hash) {
        if (err) reject(err)
        resolve(hash)
      })
    })

    const updatedAdmin = await adminService.update(adminId, update)
    res.json(updatedAdmin)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// DELETE /admins/:adminId
export const deleteAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await adminService.deleteAdmin(req.params.adminId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
