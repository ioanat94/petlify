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

/**
 * @openapi
 *  components:
 *    schemas:
 *      Product:
 *        type: object
 *        required:
 *          - name
 *          - img
 *          - description
 *          - categories
 *          - price
 *        properties:
 *          name:
 *            type: string
 *            default: Fluffy cat bed
 *          img:
 *            type: string
 *            default: https://shop-cdn-m.mediazs.com/bilder/fluffy/in/lemmikinpeti/2/800/113703_pla_fluffy_2in1_fg_1277_2.jpg
 *          description:
 *            type: string
 *            default: Soft, cozy bed for your cat to take long naps in.
 *          categories:
 *            type: object
 *            properties:
 *              pet:
 *                type: string
 *                default: cats
 *              subcategory:
 *                type: string
 *                default: beds
 *          variants:
 *            type: array
 *            items:
 *              type: string
 *            default: ['white', 'grey']
 *          sizes:
 *            type: array
 *            items:
 *              type: string
 *            default: ['small', 'medium']
 *          price:
 *            type: number
 *            default: 9.99
 *      CreatedProduct:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          img:
 *            type: string
 *          description:
 *            type: string
 *          categories:
 *            type: object
 *            properties:
 *              pet:
 *                type: string
 *              subcategory:
 *                type: string
 *          variants:
 *            type: array
 *            items:
 *              type: string
 *          sizes:
 *            type: array
 *            items:
 *              type: string
 *          price:
 *            type: number
 *          _id:
 *           type: string
 *          _v:
 *           type: number
 *      AllProducts:
 *        type: array
 *        items:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            img:
 *              type: string
 *            description:
 *              type: string
 *            categories:
 *              type: object
 *              properties:
 *                pet:
 *                  type: string
 *                subcategory:
 *                  type: string
 *            variants:
 *              type: array
 *              items:
 *                type: string
 *            sizes:
 *              type: array
 *              items:
 *                type: string
 *            price:
 *              type: number
 *            _id:
 *             type: string
 *            _v:
 *             type: number
 */

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
