import mongoose, { Document } from 'mongoose'

export type AdminDocument = Document & {
  firstname: string
  lastname: string
  email: string
  password: string
  role: string
}

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
  role: {
    type: String,
    required: true,
  },
})

export default mongoose.model<AdminDocument>('Admin', adminSchema)
