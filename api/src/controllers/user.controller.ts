import { Request, Response, NextFunction } from 'express'

import User from '../models/User'
import userService from '../services/user.service'
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

// POST /users

/**
 * @openapi
 * '/api/v1/users':
 *  post:
 *    tags:
 *      - Users
 *    summary: Create a new user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreatedUser'
 *      400:
 *        description: Bad Request
 */

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstname, lastname, email, image, isBanned } = req.body

    const user = new User({
      firstname,
      lastname,
      email,
      image,
      isBanned,
    })

    await userService.create(user)
    res.json(user)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /users

/**
 * @openapi
 * '/api/v1/users':
 *  get:
 *    tags:
 *      - Users
 *    summary: Get all users
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AllUsers'
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

    const users = await userService.findAll()
    let usersRef = [...users]

    if (search) {
      usersRef = usersRef.filter((user) =>
        user.email.toLowerCase().includes(search as string)
      )
    }

    res.json(usersRef)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /users/:userId

/**
 * @openapi
 * '/api/v1/users/{userId}':
 *  get:
 *    tags:
 *      - Users
 *    summary: Get user by ID
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: userId
 *        in: path
 *        description: User ID
 *        required: true
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreatedUser'
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
    res.json(await userService.findById(req.params.userId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /users/:userId

/**
 * @openapi
 * '/api/v1/users/{userId}':
 *  put:
 *    tags:
 *      - Users
 *    summary: Modify a user
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: userId
 *        in: path
 *        description: User ID
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreatedUser'
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Forbidden
 *      404:
 *        description: Not Found
 */

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const userId = req.params.userId
    const updatedUser = await userService.update(userId, update)
    res.json(updatedUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// DELETE /users/:userId

/**
 * @openapi
 * '/api/v1/users/{userId}':
 *  delete:
 *    tags:
 *      - Users
 *    summary: Delete a user
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: userId
 *        in: path
 *        description: User ID
 *        required: true
 *    responses:
 *      204:
 *        description: Success
 *      403:
 *        description: Forbidden
 */

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userService.deleteUser(req.params.userId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
