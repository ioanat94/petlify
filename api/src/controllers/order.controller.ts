import { Request, Response, NextFunction } from 'express'

import Order from '../models/Order'
import orderService from '../services/order.service'
import { BadRequestError } from '../helpers/apiError'

// POST /orders
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
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.query.user

    const orders = await orderService.findAll()
    let ordersRef = [...orders]

    if (user) {
      ordersRef = ordersRef.filter((order) => order.user.toString() === user)
    }

    res.json(ordersRef)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /orders/:orderId
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
