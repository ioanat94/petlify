import request from 'supertest'

import { AdminDocument } from '../../models/Admin'
import app from '../../app'
import connect, { MongodHelper } from '../../helpers/db-helper'

const userToken = process.env.userToken
const adminToken = process.env.adminToken
const nonExistingAdminId = '5e57b77b5744fa0b461c7906'

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

describe('Admin controller', () => {
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
    const res = await createAdmin()
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.lastname).toBe('Admin')
  })

  it('should not create an admin with wrong data', async () => {
    const res = await request(app)
      .post('/api/v1/admins')
      .send({
        // These fields should be included
        //   firstname: 'General',
        // lastname: 'Admin',
        email: 'genadmin@petlify.io',
        password: 'verysecurepassword',
        roles: ['products-read', 'users-read', 'admins-read'],
      })
    expect(res.status).toBe(400)
  })

  it('should get back an existing admin', async () => {
    let res = await createAdmin()
    expect(res.status).toBe(200)

    const adminId = res.body._id
    res = await request(app)
      .get(`/api/v1/admins/${adminId}`)
      .set('Authorization', `Bearer ${userToken}`)

    expect(res.body._id).toEqual(adminId)
  })

  it('should not get back a non-existing admin', async () => {
    const res = await request(app)
      .get(`/api/v1/admins/${nonExistingAdminId}`)
      .set('Authorization', `Bearer ${userToken}`)
    expect(res.status).toBe(404)
  })

  it('should get back all admins', async () => {
    const res1 = await createAdmin({
      firstname: 'General',
      lastname: 'Admin',
      email: 'genadmin1@petlify.io',
      password: 'verysecurepassword',
      roles: ['products-read', 'users-read', 'admins-read'],
    })
    const res2 = await createAdmin({
      firstname: 'General',
      lastname: 'Admin',
      email: 'genadmin2@petlify.io',
      password: 'verysecurepassword',
      roles: ['products-read', 'users-read', 'admins-read'],
    })

    const res3 = await request(app)
      .get('/api/v1/admins')
      .set('Authorization', `Bearer ${adminToken}`)

    expect(res3.body.length).toEqual(2)
    expect(res3.body[0]._id).toEqual(res1.body._id)
    expect(res3.body[1]._id).toEqual(res2.body._id)
  })

  it('should update an existing admin', async () => {
    let res = await createAdmin()
    expect(res.status).toBe(200)

    const adminId = res.body._id
    const update = {
      firstname: 'Super',
      lastname: 'User',
      email: 'superuser@petlify.io',
      password: 'verysecurepassword1',
      roles: ['products-read', 'users-read'],
    }

    res = await request(app)
      .put(`/api/v1/admins/${adminId}`)
      .send(update)
      .set('Authorization', `Bearer ${adminToken}`)

    expect(res.status).toEqual(200)
    expect(res.body.firstname).toEqual('Super')
    expect(res.body.lastname).toEqual('User')
  })

  it('should not update a non-existing admin', async () => {
    const update = {
      firstname: 'Super',
      lastname: 'User',
      email: 'superuser@petlify.io',
      password: 'verysecurepassword1',
      roles: ['products-read', 'users-read'],
    }

    const res = await request(app)
      .put(`/api/v1/admins/${nonExistingAdminId}`)
      .send(update)

    expect(res.status).toBe(404)
  })

  it('should delete an existing admin', async () => {
    let res = await createAdmin()
    expect(res.status).toBe(200)
    const adminId = res.body._id

    res = await request(app)
      .delete(`/api/v1/admins/${adminId}`)
      .set('Authorization', `Bearer ${adminToken}`)

    expect(res.status).toEqual(204)

    res = await request(app)
      .get(`/api/v1/admins/${adminId}`)
      .set('Authorization', `Bearer ${adminToken}`)
    expect(res.status).toBe(404)
  })
})
