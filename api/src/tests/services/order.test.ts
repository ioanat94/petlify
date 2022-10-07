import Order from '../../models/Order'
import OrderService from '../../services/order.service'
import connect, { MongodHelper } from '../../helpers/db-helper'

const nonExistingOrderId = '5e57b77b5744fa0b461c7906'

async function createOrder() {
  const order = new Order({
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
  })
  return await OrderService.create(order)
}

describe('Order service', () => {
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

  it('should create a order', async () => {
    const order = await createOrder()
    expect(order).toHaveProperty('_id')
    expect(order).toHaveProperty('status', 'processing')
    expect(order).toHaveProperty('value', 17.47)
  })

  it('should get an order with id', async () => {
    const order = await createOrder()
    const found = await OrderService.findById(order._id)
    expect(found.user).toEqual(order.user)
    expect(found._id).toEqual(order._id)
  })

  it('should not get a non-existing order', async () => {
    expect.assertions(1)
    return OrderService.findById(nonExistingOrderId).catch((e) => {
      expect(e.message).toMatch(`Order ${nonExistingOrderId} not found`)
    })
  })

  it('should get all orders', async () => {
    const order1 = await createOrder()
    const order2 = await createOrder()
    const order3 = await createOrder()
    const order4 = await createOrder()
    const order5 = await createOrder()

    const found = await OrderService.findAll()
    expect(found.length).toEqual(5)
  })

  it('should update an existing order', async () => {
    const order = await createOrder()
    const update = {
      status: 'confirmed',
    }
    // @ts-ignore
    const updated = await OrderService.update(order._id, update)
    expect(updated).toHaveProperty('_id', order._id)
    expect(updated).toHaveProperty('status', 'confirmed')
  })

  it('should not update a non-existing order', async () => {
    expect.assertions(1)
    const update = {
      status: 'confirmed',
    }
    // @ts-ignore
    return OrderService.update(nonExistingOrderId, update).catch((e) => {
      expect(e.message).toMatch(`Order ${nonExistingOrderId} not found`)
    })
  })

  it('should delete an existing order', async () => {
    expect.assertions(1)
    const order = await createOrder()
    await OrderService.deleteOrder(order._id)
    return OrderService.findById(order._id).catch((e) => {
      expect(e.message).toBe(`Order ${order._id} not found`)
    })
  })
})
