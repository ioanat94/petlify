import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  firstname: string
  lastname: string
  email: string
  image: string
  isBanned: boolean
}

/**
 * @openapi
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - firstname
 *          - lastname
 *          - email
 *        properties:
 *          firstname:
 *            type: string
 *            default: John
 *          lastname:
 *            type: string
 *            default: Doe
 *          email:
 *            type: string
 *            default: john.doe@gmail.com
 *          image:
 *            type: string
 *            default: https://i.pinimg.com/originals/a8/45/1f/a8451fc4aa4b4e3c39298fdfe2c3fd4d.jpg
 *          isBanned:
 *            type: boolean
 *            default: false
 *      CreatedUser:
 *        type: object
 *        properties:
 *          firstname:
 *            type: string
 *          lastname:
 *            type: string
 *          email:
 *            type: string
 *          image:
 *            type: string
 *          isBanned:
 *            type: boolean
 *          _id:
 *           type: string
 *          _v:
 *           type: number
 *      AllUsers:
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
 *            image:
 *              type: string
 *            isBanned:
 *              type: boolean
 *            _id:
 *             type: string
 *            _v:
 *             type: number
 */

const userSchema = new mongoose.Schema({
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
  image: {
    type: String,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
