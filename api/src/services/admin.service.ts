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

const update = async (
  adminId: string,
  update: Partial<AdminDocument>
): Promise<AdminDocument | null> => {
  const foundAdmin = await Admin.findByIdAndUpdate(adminId, update, {
    new: true,
  })

  if (!foundAdmin) {
    throw new NotFoundError(`Admin ${adminId} not found`)
  }

  return foundAdmin
}

const deleteAdmin = async (adminId: string): Promise<AdminDocument | null> => {
  const foundAdmin = Admin.findByIdAndDelete(adminId)

  if (!foundAdmin) {
    throw new NotFoundError(`Admin ${adminId} not found`)
  }

  return foundAdmin
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteAdmin,
}
