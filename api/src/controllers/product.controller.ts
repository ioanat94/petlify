import { Request, Response, NextFunction } from 'express'

import Product from '../models/Product'
import productService from '../services/product.service'
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

// POST /products

/**
 * @openapi
 * '/api/v1/products':
 *  post:
 *    tags:
 *      - Products
 *    summary: Create a new product
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreatedProduct'
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Forbidden
 */

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, img, description, categories, variants, sizes, price } =
      req.body

    const product = new Product({
      name,
      img,
      description,
      categories,
      variants,
      sizes,
      price,
    })

    await productService.create(product)
    res.json(product)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /products

/**
 * @openapi
 * '/api/v1/products':
 *  get:
 *    tags:
 *      - Products
 *    summary: Get all products
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AllProducts'
 */

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pet = req.query.pet
    const subcategory = req.query.subcategory
    const search = req.query.search

    const products = await productService.findAll()
    let productsRef = [...products]

    if (pet) {
      productsRef = productsRef.filter((product) =>
        product.categories.pet.includes(pet as string)
      )
    }

    if (subcategory) {
      productsRef = productsRef.filter((product) =>
        product.categories.subcategory.includes(subcategory as string)
      )
    }

    if (search) {
      productsRef = productsRef.filter((product) =>
        product.name.toLowerCase().includes(search as string)
      )
    }

    res.json(productsRef)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /products/:productId

/**
 * @openapi
 * '/api/v1/products/{productId}':
 *  get:
 *    tags:
 *      - Products
 *    summary: Get product by ID
 *    parameters:
 *      - name: productId
 *        in: path
 *        description: Product ID
 *        required: true
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreatedProduct'
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
    res.json(await productService.findById(req.params.productId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /products/:productId

/**
 * @openapi
 * '/api/v1/products/{productId}':
 *  put:
 *    tags:
 *      - Products
 *    summary: Modify a product
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: productId
 *        in: path
 *        description: Product ID
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreatedProduct'
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Forbidden
 *      404:
 *        description: Not Found
 */

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const productId = req.params.productId
    const updatedProduct = await productService.update(productId, update)
    res.json(updatedProduct)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// DELETE /products/:productId

/**
 * @openapi
 * '/api/v1/products/{productId}':
 *  delete:
 *    tags:
 *      - Products
 *    summary: Delete a product
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: productId
 *        in: path
 *        description: Product ID
 *        required: true
 *    responses:
 *      204:
 *        description: Success
 *      403:
 *        description: Forbidden
 */

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await productService.deleteProduct(req.params.productId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
