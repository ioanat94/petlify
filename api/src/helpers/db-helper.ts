import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

const connect = async () => {
  const mongod = await MongoMemoryServer.create()
  const uri = mongod.getUri()

  await mongoose.connect(uri)

  return {
    closeDatabase: async () => {
      await mongoose.connection.dropDatabase()
      await mongoose.connection.close()
      await mongod.stop()
    },
    clearDatabase: async () => {
      const collections = mongoose.connection.collections
      for (const key in collections) {
        const collection = collections[key]
        await collection.deleteMany({})
      }
    },
  }
}

export default connect
export type MongodHelper = {
  closeDatabase: () => Promise<void>
  clearDatabase: () => Promise<void>
}
