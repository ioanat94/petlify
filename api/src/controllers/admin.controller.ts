import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'

import Admin from '../models/Admin'
import adminService from '../services/admin.service'
import { BadRequestError } from '../helpers/apiError'

/**
 * @openapi
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 */

// POST /admins

/**
 * @openapi
 * '/api/v1/admins':
 *  post:
 *    tags:
 *      - Admins
 *    summary: Create a new admin
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Admin'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreatedAdmin'
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Forbidden
 */

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

/**
 * @openapi
 * '/api/v1/admins':
 *  get:
 *    tags:
 *      - Admins
 *    summary: Get all admins
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AllAdmins'
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Forbidden
 */

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

/**
 * @openapi
 * '/api/v1/admins/{adminId}':
 *  get:
 *    tags:
 *      - Admins
 *    summary: Get admin by ID
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: adminId
 *        in: path
 *        description: Admin ID
 *        required: true
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreatedAdmin'
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Forbidden
 *      404:
 *        description: Not Found
 */

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

/**
 * @openapi
 * '/api/v1/admins/{adminId}':
 *  put:
 *    tags:
 *      - Admins
 *    summary: Modify an admin
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: adminId
 *        in: path
 *        description: Admin ID
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Admin'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreatedAdmin'
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Forbidden
 *      404:
 *        description: Not Found
 */

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

/**
 * @openapi
 * '/api/v1/admins/{adminId}':
 *  delete:
 *    tags:
 *      - Admins
 *    summary: Delete an admin
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: adminId
 *        in: path
 *        description: Admin ID
 *        required: true
 *    responses:
 *      204:
 *        description: Success
 *      403:
 *        description: Forbidden
 */

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
