import request from 'supertest'

import { UserDocument } from '../../models/User'
import app from '../../app'
import connect, { MongodHelper } from '../../helpers/db-helper'
import { AdminDocument } from '../../models/Admin'

const id_token =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6ImVkMzZjMjU3YzQ3ZWJhYmI0N2I0NTY4MjhhODU4YWE1ZmNkYTEyZGQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2NjQ4OTkwNTEsImF1ZCI6IjY4MDAwMDY4MDYyNi0zZzRqcXIyM3NmcnU3MHBzOHFjMWxuYTRndmY4NDY5Mi5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExMDQ2MTg3Mzg1MzU5NDgzMDAyMSIsImVtYWlsIjoiaW9hbmF0aXBsZWE5NEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXpwIjoiNjgwMDAwNjgwNjI2LTNnNGpxcjIzc2ZydTcwcHM4cWMxbG5hNGd2Zjg0NjkyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwibmFtZSI6IklvYW5hIFRpcGxlYSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQUNOUEV1LTlBTmlvWmxGclN6dWRMTzU1MGpIa1pVay1DTjBGT2tXQ1FWblZ5QjQ9czk2LWMiLCJnaXZlbl9uYW1lIjoiSW9hbmEiLCJmYW1pbHlfbmFtZSI6IlRpcGxlYSIsImlhdCI6MTY2NDg5OTM1MSwiZXhwIjoxNjY0OTAyOTUxLCJqdGkiOiJkNTE5ZmEyN2JmOGYwODE3NDUyMjkwYTExZGY0M2ZkMGVhMjAwNDkyIn0.iRHpJLGLjkqIflDFL06tnclmSQs-11xX4Y_ZoDjjZifjuPBx8vECNapeM7YCFlnSHg00UtZrpzh7kUsT4eJZKae68cYgkAoHQkUhQNdMUb3gEwpYq7ZU-W5l-xJO-Y0ZPqT3FZX9T8NkKCmulY-TjOs3H3IgJGlwsAhKC9ZlCjdGKGFI6yYTtvGYAfVVbILFsdDlCd5iiXkzyl4itae5LLcbcBJPshgiGpC79Mgup6JbFci_1_dwut0g-2Crfkn1HDDdug97ZOe3BMKJSSHqSiFsx86AaL8Dowy30gkilWmEYqQzcNwgCp24Jj4PmDN4flnJ8m482TaYmuTJMxQ5DA'

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
