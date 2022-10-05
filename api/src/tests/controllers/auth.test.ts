import request from 'supertest'

import { UserDocument } from '../../models/User'
import app from '../../app'
import connect, { MongodHelper } from '../../helpers/db-helper'
import { AdminDocument } from '../../models/Admin'

const id_token = process.env.id_token

async function createUser(override?: Partial<UserDocument>) {
  let user = {
    firstname: 'Real',
    lastname: 'Person',
    email: 'real.person@gmail.com',
    image:
      'https://i.pinimg.com/originals/f5/8a/ac/f58aacd2cddf1a32e2701ba767184f3c.jpg',
  }

  if (override) {
    user = { ...user, ...override }
  }

  return await request(app).post('/api/v1/users').send(user)
}

async function createAdmin(override?: Partial<AdminDocument>) {
  let admin = {
    firstname: 'General',
    lastname: 'Admin',
    email: 'genadmin@petlify.io',
    password: 'verysecurepassword',
    roles: ['products-read', 'users-read', 'admins-read'],
  }

  if (override) {
    admin = { ...admin, ...override }
  }

  return await request(app).post('/api/v1/admins').send(admin)
}

describe('Auth controller', () => {
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

  it('should login a user', async () => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const user = res.body

    res = await request(app)
      .post('/api/v1/auth/login')
      .type('json')
      .send(user)
      .set('id_token', `${id_token}`)

    expect(res.body).toHaveProperty('token')
    expect(res.body.user).toHaveProperty('_id')
  })

  it('should login an admin', async () => {
    let res = await createAdmin()
    expect(res.status).toBe(200)

    res = await request(app)
      .post('/api/v1/auth/login-admin')
      .send({ email: 'genadmin@petlify.io', password: 'verysecurepassword' })

    expect(res.body).toHaveProperty('token')
    expect(res.body.resAdmin).toHaveProperty('adminId')
  })
})
