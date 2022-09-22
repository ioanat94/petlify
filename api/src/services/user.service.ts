import User, { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'

const create = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}

const findById = async (userId: string): Promise<UserDocument> => {
  const foundUser = await User.findById(userId)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

// const findAll = async (): Promise<ProductDocument[]> => {
//   return Product.find().sort({ price: 1, name: 1 })
// }

// const update = async (
//   productId: string,
//   update: Partial<ProductDocument>
// ): Promise<ProductDocument | null> => {
//   const foundProduct = await Product.findByIdAndUpdate(productId, update, {
//     new: true,
//   })

//   if (!foundProduct) {
//     throw new NotFoundError(`Product ${productId} not found`)
//   }

//   return foundProduct
// }

// const deleteProduct = async (
//   productId: string
// ): Promise<ProductDocument | null> => {
//   const foundProduct = Product.findByIdAndDelete(productId)

//   if (!foundProduct) {
//     throw new NotFoundError(`Product ${productId} not found`)
//   }

//   return foundProduct
// }

export default {
  create,
  findById,
  // findAll,
  // update,
  // deleteProduct,
}
