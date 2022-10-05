import mongoose, { Document } from 'mongoose'

export type OrderDocument = Document & {
  date: Date
  products: mongoose.Schema.Types.ObjectId[]
  user: mongoose.Schema.Types.ObjectId
  value: number
  status: 'processing' | 'confirmed' | 'shipping' | 'delivered'
}

const orderSchema = new mongoose.Schema({
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['processing', 'confirmed', 'shipping', 'delivered'],
    default: 'processing',
  },
})

export default mongoose.model<OrderDocument>('Order', orderSchema)
