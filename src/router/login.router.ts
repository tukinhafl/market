import { Router } from 'express'
import { login } from '../controllers/user.controller'
import { validateDataSchema } from '../middlewares/validateDataSchema'
import { loginSchema } from '../schemas/loginSchema'

const router = Router()

export const loginRouter = () => {
  router.post('', validateDataSchema(loginSchema), login)

  return router
}