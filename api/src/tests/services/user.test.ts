import User from '../../models/User'
import UserService from '../../services/user.service'

import connect, { MongodHelper } from '../../helpers/db-helper'

const nonExistingUserId = '5e57b77b5744fa0b461c7906'

async function createUser(email?: string) {
  const user = new User({
    firstname: 'Real',
    lastname: 'Person',
    email: email || 'real.person@gmail.com',
    image:
      'https://i.pinimg.com/originals/f5/8a/ac/f58aacd2cddf1a32e2701ba767184f3c.jpg',
  })
  return await UserService.create(user)
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

  it('should create a user', async () => {
    const user = await createUser()
    expect(user).toHaveProperty('_id')
    expect(user).toHaveProperty('lastname', 'Person')
    expect(user).toHaveProperty('email', 'real.person@gmail.com')
  })

  it('should get a user with id', async () => {
    const user = await createUser()
    const found = await UserService.findById(user._id)
    expect(found.lastname).toEqual(user.lastname)
    expect(found._id).toEqual(user._id)
  })

  it('should not get a non-existing user', async () => {
    expect.assertions(1)
    return UserService.findById(nonExistingUserId).catch((e) => {
      expect(e.message).toMatch(`User ${nonExistingUserId} not found`)
    })
  })

  it('should get all users', async () => {
    const user1 = await createUser('real.person1@gmail.com')
    const user2 = await createUser('real.person2@gmail.com')
    const user3 = await createUser('real.person3@gmail.com')
    const user4 = await createUser('real.person4@gmail.com')
    const user5 = await createUser('real.person5@gmail.com')

    const found = await UserService.findAll()
    expect(found.length).toEqual(5)
  })

  it('should update an existing user', async () => {
    const user = await createUser()
    const update = {
      firstname: 'John',
      lastname: 'Doe',
    }
    const updated = await UserService.update(user._id, update)
    expect(updated).toHaveProperty('_id', user._id)
    expect(updated).toHaveProperty('firstname', 'John')
    expect(updated).toHaveProperty('lastname', 'Doe')
  })

  it('should not update a non-existing user', async () => {
    expect.assertions(1)
    const update = {
      firstname: 'John',
      lastname: 'Doe',
    }

    return UserService.update(nonExistingUserId, update).catch((e) => {
      expect(e.message).toMatch(`User ${nonExistingUserId} not found`)
    })
  })

  it('should delete an existing user', async () => {
    expect.assertions(1)
    const user = await createUser()
    await UserService.deleteUser(user._id)
    return UserService.findById(user._id).catch((e) => {
      expect(e.message).toBe(`User ${user._id} not found`)
    })
  })
})
