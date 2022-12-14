import request from 'supertest'

import { UserDocument } from '../../models/User'
import app from '../../app'
import connect, { MongodHelper } from '../../helpers/db-helper'

const userToken = process.env.userToken
const adminToken = process.env.adminToken
const nonExistingUserId = '5e57b77b5744fa0b461c7906'

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

describe('User controller', () => {
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

  it('should create a user', async () => {
    const res = await createUser()
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.lastname).toBe('Person')
  })

  it('should not create a user with wrong data', async () => {
    const res = await request(app).post('/api/v1/users').send({
      firstname: 'Real',
      // These fields should be included
      // lastname: 'Person',
      // email: 'real.person@gmail.com',
      image:
        'https://i.pinimg.com/originals/f5/8a/ac/f58aacd2cddf1a32e2701ba767184f3c.jpg',
    })
    expect(res.status).toBe(400)
  })

  it('should get back an existing user', async () => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const userId = res.body._id
    res = await request(app)
      .get(`/api/v1/users/${userId}`)
      .set('Authorization', `Bearer ${userToken}`)

    expect(res.body._id).toEqual(userId)
  })

  it('should not get back a non-existing user', async () => {
    const res = await request(app)
      .get(`/api/v1/users/${nonExistingUserId}`)
      .set('Authorization', `Bearer ${userToken}`)
    expect(res.status).toBe(404)
  })

  it('should get back all users', async () => {
    const res1 = await createUser({
      firstname: 'Real',
      lastname: 'Person',
      email: 'real.person1@gmail.com',
      image:
        'https://i.pinimg.com/originals/f5/8a/ac/f58aacd2cddf1a32e2701ba767184f3c.jpg',
    })
    const res2 = await createUser({
      firstname: 'Real',
      lastname: 'Person',
      email: 'real.person2@gmail.com',
      image:
        'https://i.pinimg.com/originals/f5/8a/ac/f58aacd2cddf1a32e2701ba767184f3c.jpg',
    })

    const res3 = await request(app)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${adminToken}`)

    expect(res3.body.length).toEqual(2)
    expect(res3.body[0]._id).toEqual(res1.body._id)
    expect(res3.body[1]._id).toEqual(res2.body._id)
  })

  it('should update an existing user', async () => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const userId = res.body._id
    const update = {
      firstname: 'John',
      lastname: 'Doe',
    }

    res = await request(app)
      .put(`/api/v1/users/${userId}`)
      .send(update)
      .set('Authorization', `Bearer ${adminToken}`)

    expect(res.status).toEqual(200)
    expect(res.body.firstname).toEqual('John')
    expect(res.body.lastname).toEqual('Doe')
  })

  it('should not update a non-existing user', async () => {
    const update = {
      firstname: 'John',
      lastname: 'Doe',
    }

    const res = await request(app)
      .put(`/api/v1/users/${nonExistingUserId}`)
      .send(update)

    expect(res.status).toBe(404)
  })

  it('should delete an existing user', async () => {
    let res = await createUser()
    expect(res.status).toBe(200)
    const userId = res.body._id

    res = await request(app)
      .delete(`/api/v1/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`)

    expect(res.status).toEqual(204)

    res = await request(app)
      .get(`/api/v1/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`)
    expect(res.status).toBe(404)
  })
})
