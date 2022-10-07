import Admin from '../../models/Admin'
import AdminService from '../../services/admin.service'
import connect, { MongodHelper } from '../../helpers/db-helper'

const nonExistingAdminId = '5e57b77b5744fa0b461c7906'
const nonExistingAdminEmail = 'fakeemail@gmail.com'

async function createAdmin(email?: string) {
  const admin = new Admin({
    firstname: 'General',
    lastname: 'Admin',
    email: email || 'genadmin@petlify.io',
    password: 'verysecurepassword',
    roles: ['products-read', 'users-read', 'admins-read'],
  })
  return await AdminService.create(admin)
}

describe('Admin service', () => {
  let mongodHelper: MongodHelper

  beforeAll(async () => {
    mongodHelper = await connect()
  })

  afterEach(async () => {
    await mongodHelper.clearDatabase()
  })

  afterAll(async () => {
    await mongodHelper.closeDatabase()
  })

  it('should create an admin', async () => {
    const admin = await createAdmin()
    expect(admin).toHaveProperty('_id')
    expect(admin).toHaveProperty('lastname', 'Admin')
    expect(admin).toHaveProperty('email', 'genadmin@petlify.io')
  })

  it('should get an admin with id', async () => {
    const admin = await createAdmin()
    const found = await AdminService.findById(admin._id)
    expect(found.lastname).toEqual(admin.lastname)
    expect(found._id).toEqual(admin._id)
  })

  it('should get an admin with email', async () => {
    const admin = await createAdmin()
    const found = await AdminService.findByEmail(admin.email)
    expect(found.lastname).toEqual(admin.lastname)
    expect(found._id).toEqual(admin._id)
  })

  it('should not get a non-existing admin by id', async () => {
    expect.assertions(1)
    return AdminService.findById(nonExistingAdminId).catch((e) => {
      expect(e.message).toMatch(`Admin ${nonExistingAdminId} not found`)
    })
  })

  it('should not get a non-existing admin by email', async () => {
    expect.assertions(1)
    return AdminService.findByEmail(nonExistingAdminEmail).catch((e) => {
      expect(e.message).toMatch('Wrong email or password.')
    })
  })

  it('should get all admins', async () => {
    const admin1 = await createAdmin('genadmin1@petlify.io')
    const admin2 = await createAdmin('genadmin2@petlify.io')
    const admin3 = await createAdmin('genadmin3@petlify.io')
    const admin4 = await createAdmin('genadmin4@petlify.io')
    const admin5 = await createAdmin('genadmin5@petlify.io')

    const found = await AdminService.findAll()
    expect(found.length).toEqual(5)
  })

  it('should update an existing admin', async () => {
    const admin = await createAdmin()
    const update = {
      firstname: 'John',
      lastname: 'Doe',
    }
    const updated = await AdminService.update(admin._id, update)
    expect(updated).toHaveProperty('_id', admin._id)
    expect(updated).toHaveProperty('firstname', 'John')
    expect(updated).toHaveProperty('lastname', 'Doe')
  })

  it('should not update a non-existing admin', async () => {
    expect.assertions(1)
    const update = {
      firstname: 'John',
      lastname: 'Doe',
    }

    return AdminService.update(nonExistingAdminId, update).catch((e) => {
      expect(e.message).toMatch(`Admin ${nonExistingAdminId} not found`)
    })
  })

  it('should delete an existing admin', async () => {
    expect.assertions(1)
    const admin = await createAdmin()
    await AdminService.deleteAdmin(admin._id)
    return AdminService.findById(admin._id).catch((e) => {
      expect(e.message).toBe(`Admin ${admin._id} not found`)
    })
  })
})
