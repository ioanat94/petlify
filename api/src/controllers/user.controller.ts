import { Request, Response, NextFunction } from 'express'

import User from '../models/User'
import userService from '../services/user.service'
import { BadRequestError } from '../helpers/apiError'

// POST /users
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstname, lastname, email, password, isBanned } = req.body

    const user = new User({
      firstname,
      lastname,
      email,
      password,
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

// // GET /products
// export const findAll = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     res.json(await productService.findAll())
//   } catch (error) {
//     if (error instanceof Error && error.name == 'ValidationError') {
//       next(new BadRequestError('Invalid Request', 400, error))
//     } else {
//       next(error)
//     }
//   }
// }

// // GET /products/:productId
// export const findById = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     res.json(await productService.findById(req.params.productId))
//   } catch (error) {
//     if (error instanceof Error && error.name == 'ValidationError') {
//       next(new BadRequestError('Invalid Request', 400, error))
//     } else {
//       next(error)
//     }
//   }
// }

// // PUT /products/:productId
// export const updateProduct = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const update = req.body
//     const productId = req.params.productId
//     const updatedProduct = await productService.update(productId, update)
//     res.json(updatedProduct)
//   } catch (error) {
//     if (error instanceof Error && error.name == 'ValidationError') {
//       next(new BadRequestError('Invalid Request', 400, error))
//     } else {
//       next(error)
//     }
//   }
// }

// // DELETE /products/:productId
// export const deleteProduct = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     await productService.deleteProduct(req.params.productId)
//     res.status(204).end()
//   } catch (error) {
//     if (error instanceof Error && error.name == 'ValidationError') {
//       next(new BadRequestError('Invalid Request', 400, error))
//     } else {
//       next(error)
//     }
//   }
// }
