import Product, { ProductDocument } from '../models/Product'
import { NotFoundError } from '../helpers/apiError'

const create = async (product: ProductDocument): Promise<ProductDocument> => {
  return product.save()
}

const findById = async (productId: string): Promise<ProductDocument> => {
  const foundProduct = await Product.findById(productId)

  if (!foundProduct) {
    throw new NotFoundError(`Product ${productId} not found`)
  }

  return foundProduct
}

const findAll = async (): Promise<ProductDocument[]> => {
  return Product.find().sort({ price: 1, name: 1 })
}

// const update = async (
//   movieId: string,
//   update: Partial<MovieDocument>
// ): Promise<MovieDocument | null> => {
//   const foundMovie = await Movie.findByIdAndUpdate(movieId, update, {
//     new: true,
//   })

//   if (!foundMovie) {
//     throw new NotFoundError(`Movie ${movieId} not found`)
//   }

//   return foundMovie
// }

// const deleteMovie = async (movieId: string): Promise<MovieDocument | null> => {
//   const foundMovie = Movie.findByIdAndDelete(movieId)

//   if (!foundMovie) {
//     throw new NotFoundError(`Movie ${movieId} not found`)
//   }

//   return foundMovie
// }

export default {
  create,
  findById,
  findAll,
  // update,
  // deleteMovie,
}
