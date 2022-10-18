import mongoose, { Document } from 'mongoose'

export type AdminDocument = Document & {
  firstname: string
  lastname: string
  email: string
  password: string
  roles: (
    | 'products-read'
    | 'products-write'
    | 'orders-read'
    | 'orders-write'
    | 'users-read'
    | 'users-write'
    | 'admins-read'
    | 'admins-write'
  )[]
}

/**
 * @openapi
 *  components:
 *    schemas:
 *      Admin:
 *        type: object
 *        required:
 *          - firstname
 *          - lastname
 *          - email
 *          - password
 *          - roles
 *        properties:
 *          firstname:
 *            type: string
 *            default: John
 *          lastname:
 *            type: string
 *            default: Doe
 *          email:
 *            type: string
 *            default: john.doe@petlify.io
 *          password:
 *            type: string
 *            default: securepassword
 *          roles:
 *            type: array
 *            items:
 *              type: string
 *            default: ['products-read', 'products-write']
 *      CreatedAdmin:
 *        type: object
 *        properties:
 *          firstname:
 *            type: string
 *          lastname:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string
 *          roles:
 *            type: array
 *            items:
 *              type: string
 *          _id:
 *           type: string
 *          _v:
 *           type: number
 *      AllAdmins:
 *        type: array
 *        items:
 *          type: object
 *          properties:
 *            firstname:
 *              type: string
 *            lastname:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *            roles:
 *              type: array
 *              items:
 *                type: string
 *            _id:
 *             type: string
 *            _v:
 *             type: number
 */

const adminSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    enum: [
      'products-read',
      'products-write',
      'orders-read',
      'orders-write',
      'users-read',
      'users-write',
      'admins-read',
      'admins-write',
    ],
    required: true,
  },
})

export default mongoose.model<AdminDocument>('Admin', adminSchema)
