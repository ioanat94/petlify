import request from 'supertest'

import { ProductDocument } from '../../models/Product'
import app from '../../app'
import connect, { MongodHelper } from '../../helpers/db-helper'

const nonExistingProductId = '5e57b77b5744fa0b461c7906'

async function createProduct(override?: Partial<ProductDocument>) {
  let product = {
    name: 'Trixie travel set',
    img: 'https://shop-cdn-m.mediazs.com/bilder/trixiematkasetti/ruokasili/ruokakuppia/3/800/34153_PLA_Reise_Set_HS_2491_3.jpg',
    description: 'Designed to suit all of your dog\'s needs.',
    categories: {
      pet: 'dogs',
      subcategory: 'other',
    },
    variants: ['blue', 'green'],
    sizes: ['medium'],
    price: 9.99,
  }

  if (override) {
    product = { ...product, ...override }
  }

  return await request(app).post('/api/v1/products').send(product)
}

describe('Product controller', () => {
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

  it('should create a product', async () => {
    const res = await createProduct()
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.name).toBe('Trixie travel set')
  })

  it('should not create a product with wrong data', async () => {
    const res = await request(app)
      .post('/api/v1/products')
      .send({
        name: 'Trixie travel set',
        img: 'https://shop-cdn-m.mediazs.com/bilder/trixiematkasetti/ruokasili/ruokakuppia/3/800/34153_PLA_Reise_Set_HS_2491_3.jpg',
        // These fields should be included
        // description: "Designed to suit all of your dog's needs.",
        // categories: {
        //   pet: 'dogs',
        //   subcategory: 'other',
        // },
        variants: ['blue', 'green'],
        sizes: ['medium'],
        price: 9.99,
      })
    expect(res.status).toBe(400)
  })

  it('should get back an existing product', async () => {
    let res = await createProduct()
    expect(res.status).toBe(200)

    const productId = res.body._id
    res = await request(app).get(`/api/v1/products/${productId}`)

    expect(res.body._id).toEqual(productId)
  })

  it('should not get back a non-existing product', async () => {
    const res = await request(app).get(
      `/api/v1/products/${nonExistingProductId}`
    )
    expect(res.status).toBe(404)
  })

  it('should get back all products', async () => {
    const res1 = await createProduct({
      name: 'Trixie travel set',
      img: 'https://shop-cdn-m.mediazs.com/bilder/trixiematkasetti/ruokasili/ruokakuppia/3/800/34153_PLA_Reise_Set_HS_2491_3.jpg',
      description: 'Designed to suit all of your dog\'s needs.',
      categories: {
        pet: 'dogs',
        subcategory: 'other',
      },
      variants: ['blue', 'green'],
      sizes: ['medium'],
      price: 9.99,
    })
    const res2 = await createProduct({
      name: 'Trixie travel set 2',
      img: 'https://shop-cdn-m.mediazs.com/bilder/trixiematkasetti/ruokasili/ruokakuppia/3/800/34153_PLA_Reise_Set_HS_2491_3.jpg',
      description: 'Designed to suit all of your dog\'s needs.',
      categories: {
        pet: 'dogs',
        subcategory: 'other',
      },
      variants: ['blue', 'green'],
      sizes: ['medium'],
      price: 9.99,
    })

    const res3 = await request(app).get('/api/v1/products')

    expect(res3.body.length).toEqual(2)
    expect(res3.body[0]._id).toEqual(res1.body._id)
    expect(res3.body[1]._id).toEqual(res2.body._id)
  })

  it('should update an existing product', async () => {
    let res = await createProduct()
    expect(res.status).toBe(200)

    const productId = res.body._id
    const update = {
      name: 'Cat litter',
      price: 15.49,
    }

    res = await request(app).put(`/api/v1/products/${productId}`).send(update)

    expect(res.status).toEqual(200)
    expect(res.body.name).toEqual('Cat litter')
    expect(res.body.price).toEqual(15.49)
  })

  it('should not update a non-existing product', async () => {
    const update = {
      name: 'Cat litter',
      price: 15.49,
    }

    const res = await request(app)
      .put(`/api/v1/products/${nonExistingProductId}`)
      .send(update)

    expect(res.status).toBe(404)
  })

  it('should delete an existing product', async () => {
    let res = await createProduct()
    expect(res.status).toBe(200)
    const productId = res.body._id

    res = await request(app).delete(`/api/v1/products/${productId}`)

    expect(res.status).toEqual(204)

    res = await request(app).get(`/api/v1/products/${productId}`)
    expect(res.status).toBe(404)
  })
})
