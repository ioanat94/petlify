import mongoose, { Document } from 'mongoose'

export type ProductDocument = Document & {
  name: string
  img: string
  description: string
  categories: {
    pet: string
    subcategory: string
  }
  variants: string[]
  sizes: string[]
  price: number
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categories: {
    type: {
      _id: { id: false },
      pet: String,
      subcategory: String,
    },
    index: true,
    required: true,
  },
  variants: {
    type: [String],
    index: true,
  },
  sizes: {
    type: [String],
  },
  price: {
    type: Number,
    required: true,
  },
})

export default mongoose.model<ProductDocument>('Product', productSchema)
