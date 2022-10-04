import express, { Request, Response, NextFunction } from 'express'
import { z, AnyZodObject } from 'zod'

const app = express()

app.use(express.json())

export const productCreateSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }),
    img: z.string({
      required_error: 'Image URL is required',
      invalid_type_error: 'Image URL must be a string',
    }),
    description: z.string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    }),
    categories: z.object({
      pet: z.string({
        required_error: 'Pet type is required',
      }),
      subcategory: z.string({
        required_error: 'Subcategory type is required',
      }),
    }),
    variants: z.array(
      z.string({ invalid_type_error: 'Variant must be a string' })
    ),
    sizes: z.array(z.string({ invalid_type_error: 'Size must be a string' })),
    price: z.number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    }),
  }),
})

export const adminCreateSchema = z.object({
  body: z.object({
    firstname: z.string({
      required_error: 'First name is required',
      invalid_type_error: 'First name must be a string',
    }),
    lastname: z.string({
      required_error: 'Last name is required',
      invalid_type_error: 'Last name must be a string',
    }),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email(),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
      })
      .min(8, { message: 'Must be 8 or more characters long' }),
    roles:
      // z.enum([
      //   'products-read',
      //   'products-write',
      //   'users-read',
      //   'users-write',
      //   'admins-read',
      //   'admins-write',
      // ]),
      z.array(
        z.string({
          required_error: 'At least one role is required',
          invalid_type_error: 'Role must be a string',
        })
      ),
  }),
})

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      return next()
    } catch (error) {
      return res.status(400).json(error)
    }
  }
