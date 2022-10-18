import swaggerJSDoc, { Options } from 'swagger-jsdoc'
import path from 'path'

const controllers = path.resolve(__dirname, '../controllers/*.ts')
const models = path.resolve(__dirname, '../models/*.ts')

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Petlify',
      version: '1.0.0',
    },
  },
  servers: [
    {
      url: 'https://petlify-backend.up.railway.app/',
    },
    {
      url: 'http://localhost:4000/',
    },
  ],
  apis: [controllers, models],
}

const swaggerDocs = swaggerJSDoc(options)

export default swaggerDocs
