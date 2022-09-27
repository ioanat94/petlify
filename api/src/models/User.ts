import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  firstname: string
  lastname: string
  email: string
  image: string
  isBanned: boolean
}

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
