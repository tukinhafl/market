import 'reflect-metadata'
import express from 'express'
import { connectDatabase } from './database'
import { initializerRouter } from './router'
import { errorHandler } from './middlewares/error'

connectDatabase()

const app = express()

app.use(express.json())

initializerRouter(app)

app.use(errorHandler)

export default app