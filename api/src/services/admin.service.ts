import Admin, { AdminDocument } from '../models/Admin'
import { NotFoundError } from '../helpers/apiError'

const create = async (admin: AdminDocument): Promise<AdminDocument> => {
  return admin.save()
}

const findById = async (adminId: string): Promise<AdminDocument> => {
  const foundAdmin = await Admin.findById(adminId)

  if (!foundAdmin) {
    throw new NotFoundError(`Admin ${adminId} not found`)
  }

  return foundAdmin
}

const findAll = async (): Promise<AdminDocument[]> => {
  return Admin.find().sort({ name: 1 })
}

// const update = async (
//   userId: string,
//   update: Partial<UserDocument>
// ): Promise<UserDocument | null> => {
//   const foundUser = await User.findByIdAndUpdate(userId, update, {
//     new: true,
//   })

//   if (!foundUser) {
//     throw new NotFoundError(`User ${userId} not found`)
//   }

//   return foundUser
// }

// const deleteUser = async (userId: string): Promise<UserDocument | null> => {
//   const foundUser = User.findByIdAndDelete(userId)

//   if (!foundUser) {
//     throw new NotFoundError(`User ${userId} not found`)
//   }

//   return foundUser
// }

export default {
  create,
  findById,
  findAll,
  // update,
  // deleteUser,
}
