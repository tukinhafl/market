import 'reflect-metadata'
import express from 'express'
import { connectDatabase } from './database'
import { initializerRouter } from './router'
import { errorHandler } from './middlewares/error'
import swaggerUiExpress from 'swagger-ui-express'
import swaggerDocument from '../swagger.json'

connectDatabase()

const app = express()

app.use(express.json())
app.use('/api-documentation', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocument))

initializerRouter(app)

app.use(errorHandler)

export default app