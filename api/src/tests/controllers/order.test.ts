import request from 'supertest'

import { OrderDocument } from '../../models/Order'
import app from '../../app'
import connect, { MongodHelper } from '../../helpers/db-helper'

const nonExistingOrderId = '5e57b77b5744fa0b461c7906'

async function createOrder(override?: Partial<OrderDocument>) {
  let order = {
    products: [
      '633413614c76b7175dc4c0db',
      '633413d14c76b7175dc4c0e9',
      '633413ee4c76b7175dc4c0f7',
    ],
    user: '63355bcc1bb79af91baa97b8',
    date: 'Wed Oct 05 2022 09:44:01 GMT+0300 (Eastern European Summer Time)',
    address: 'Pohjoisesplanadi 46, 00200 Helsinki, Finland',
    value: 17.47,
    status: 'processing',
  }

  if (override) {
    // @ts-ignore
    order = { ...order, ...override }
  }

  return await request(app).post('/api/v1/orders').send(order)
}

describe('Order controller', () => {
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

  it('should create an order', async () => {
    const res = await createOrder()
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.status).toBe('processing')
  })

  it('should not create an order with wrong data', async () => {
    const res = await request(app).post('/api/v1/orders').send({
      // These fields should be included
      // products: [
      //   '633413614c76b7175dc4c0db',
      //   '633413d14c76b7175dc4c0e9',
      //   '633413ee4c76b7175dc4c0f7',
      // ],
      // user: '63355bcc1bb79af91baa97b8',
      date: 'Wed Oct 05 2022 09:44:01 GMT+0300 (Eastern European Summer Time)',
      address: 'Pohjoisesplanadi 46, 00200 Helsinki, Finland',
      value: 17.47,
      status: 'processing',
    })
    expect(res.status).toBe(400)
  })

  it('should get back an existing order', async () => {
    let res = await createOrder()
    expect(res.status).toBe(200)

    const orderId = res.body._id
    res = await request(app).get(`/api/v1/orders/${orderId}`)

    expect(res.body._id).toEqual(orderId)
  })

  it('should not get back a non-existing order', async () => {
    const res = await request(app).get(`/api/v1/orders/${nonExistingOrderId}`)
    expect(res.status).toBe(404)
  })

  it('should get back all orders', async () => {
    const res1 = await createOrder()
    const res2 = await createOrder()

    const res3 = await request(app).get('/api/v1/orders')

    expect(res3.body.length).toEqual(2)
    expect(res3.body[0]._id).toEqual(res1.body._id)
    expect(res3.body[1]._id).toEqual(res2.body._id)
  })

  it('should update an existing order', async () => {
    let res = await createOrder()
    expect(res.status).toBe(200)

    const orderId = res.body._id
    const update = {
      status: 'confirmed',
    }

    res = await request(app).put(`/api/v1/orders/${orderId}`).send(update)

    expect(res.status).toEqual(200)
    expect(res.body.status).toEqual('confirmed')
  })

  it('should not update a non-existing order', async () => {
    const update = {
      status: 'confirmed',
    }

    const res = await request(app)
      .put(`/api/v1/orders/${nonExistingOrderId}`)
      .send(update)

    expect(res.status).toBe(404)
  })

  it('should delete an existing order', async () => {
    let res = await createOrder()
    expect(res.status).toBe(200)
    const orderId = res.body._id

    res = await request(app).delete(`/api/v1/orders/${orderId}`)

    expect(res.status).toEqual(204)

    res = await request(app).get(`/api/v1/orders/${orderId}`)
    expect(res.status).toBe(404)
  })
})
