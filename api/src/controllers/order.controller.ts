import { Request, Response, NextFunction } from 'express'

import Order from '../models/Order'
import orderService from '../services/order.service'
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

// POST /orders

/**
 * @openapi
 * '/api/v1/orders':
 *  post:
 *    tags:
 *      - Orders
 *    summary: Create a new order
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Order'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreatedOrder'
 *      400:
 *        description: Bad Request
 */

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { products, user, date, address, value, status } = req.body

    const order = new Order({
      products,
      user,
      date,
      address,
      value,
      status,
    })

    await orderService.create(order)
    res.json(order)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /orders

/**
 * @openapi
 * '/api/v1/orders':
 *  get:
 *    tags:
 *      - Orders
 *    summary: Get all orders
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AllOrders'
 */

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.query.user
    let search: string

    if (typeof user === 'string') {
      const adminSearch = user.includes('search')

      if (adminSearch) {
        search = user.substring(8)
      } else {
        search = user
      }
    }

    let orders = await orderService.findAll()

    if (user) {
      orders = orders.filter((order) => order.user.toString() === search)
    }

    res.json(orders)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /orders/:orderId

/**
 * @openapi
 * '/api/v1/orders/{orderId}':
 *  get:
 *    tags:
 *      - Orders
 *    summary: Get order by ID
 *    parameters:
 *      - name: orderId
 *        in: path
 *        description: Order ID
 *        required: true
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreatedOrder'
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await orderService.findById(req.params.orderId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /orders/:orderId

/**
 * @openapi
 * '/api/v1/orders/{orderId}':
 *  put:
 *    tags:
 *      - Orders
 *    summary: Modify an order
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: orderId
 *        in: path
 *        description: Order ID
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Order'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreatedOrder'
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Forbidden
 *      404:
 *        description: Not Found
 */

export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const orderId = req.params.orderId
    const updatedOrder = await orderService.update(orderId, update)
    res.json(updatedOrder)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// DELETE /orders/:orderId

/**
 * @openapi
 * '/api/v1/orders/{orderId}':
 *  delete:
 *    tags:
 *      - Orders
 *    summary: Delete an order
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: orderId
 *        in: path
 *        description: Order ID
 *        required: true
 *    responses:
 *      204:
 *        description: Success
 *      403:
 *        description: Forbidden
 */

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await orderService.deleteOrder(req.params.orderId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
