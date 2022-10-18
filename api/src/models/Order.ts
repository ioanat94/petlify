import mongoose, { Document } from 'mongoose'

export type OrderDocument = Document & {
  date: Date
  products: mongoose.Schema.Types.ObjectId[]
  user: mongoose.Schema.Types.ObjectId
  value: number
  status: 'processing' | 'confirmed' | 'shipping' | 'delivered'
}

/**
 * @openapi
 *  components:
 *    schemas:
 *      Order:
 *        type: object
 *        required:
 *          - products
 *          - user
 *          - date
 *          - address
 *          - value
 *        properties:
 *          products:
 *            type: array
 *            items:
 *              type: string
 *            default: ['634e86589a93b57b7a9f8be1', '634e865f71c39c4bd865f14b']
 *          user:
 *            type: string
 *            default: 634e867b0a6d884108d0a90e
 *          date:
 *            type: string
 *            format: date
 *            default: 2022-10-07T08:35:56.725+00:00
 *          address:
 *            type: string
 *            default: Piilostentie 33, 18120 Heinola, Finland
 *          value:
 *            type: number
 *            default: 9.99
 *          status:
 *            type: string
 *            default: processing
 *      CreatedOrder:
 *        type: object
 *        properties:
 *          products:
 *            type: array
 *            items:
 *              type: string
 *          user:
 *            type: string
 *          date:
 *            type: string
 *            format: date
 *          address:
 *            type: string
 *          value:
 *            type: number
 *          status:
 *            type: string
 *          _id:
 *           type: string
 *          _v:
 *           type: number
 *      AllOrders:
 *        type: array
 *        items:
 *          type: object
 *          properties:
 *            products:
 *              type: array
 *              items:
 *                type: string
 *            user:
 *              type: string
 *            date:
 *              type: string
 *              format: date
 *            address:
 *              type: string
 *            value:
 *              type: number
 *            status:
 *              type: string
 *            _id:
 *              type: string
 *            _v:
 *              type: number
 */

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
