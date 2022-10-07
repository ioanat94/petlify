import Product from '../../models/Product'
import ProductService from '../../services/product.service'
import connect, { MongodHelper } from '../../helpers/db-helper'

const nonExistingProductId = '5e57b77b5744fa0b461c7906'

async function createProduct() {
  const product = new Product({
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
  return await ProductService.create(product)
}

describe('Product service', () => {
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
    const product = await createProduct()
    expect(product).toHaveProperty('_id')
    expect(product).toHaveProperty('name', 'Trixie travel set')
    expect(product).toHaveProperty('price', 9.99)
  })

  it('should get a product with id', async () => {
    const product = await createProduct()
    const found = await ProductService.findById(product._id)
    expect(found.name).toEqual(product.name)
    expect(found._id).toEqual(product._id)
  })

  it('should not get a non-existing product', async () => {
    expect.assertions(1)
    return ProductService.findById(nonExistingProductId).catch((e) => {
      expect(e.message).toMatch(`Product ${nonExistingProductId} not found`)
    })
  })

  it('should get all products', async () => {
    const product1 = await createProduct()
    const product2 = await createProduct()
    const product3 = await createProduct()
    const product4 = await createProduct()
    const product5 = await createProduct()

    const found = await ProductService.findAll()
    expect(found.length).toEqual(5)
  })

  it('should update an existing product', async () => {
    const product = await createProduct()
    const update = {
      name: 'Cat litter',
      price: 15.49,
    }
    const updated = await ProductService.update(product._id, update)
    expect(updated).toHaveProperty('_id', product._id)
    expect(updated).toHaveProperty('name', 'Cat litter')
    expect(updated).toHaveProperty('price', 15.49)
  })

  it('should not update a non-existing product', async () => {
    expect.assertions(1)
    const update = {
      name: 'Cat litter',
      price: 15.49,
    }

    return ProductService.update(nonExistingProductId, update).catch((e) => {
      expect(e.message).toMatch(`Product ${nonExistingProductId} not found`)
    })
  })

  it('should delete an existing product', async () => {
    expect.assertions(1)
    const product = await createProduct()
    await ProductService.deleteProduct(product._id)
    return ProductService.findById(product._id).catch((e) => {
      expect(e.message).toBe(`Product ${product._id} not found`)
    })
  })
})
