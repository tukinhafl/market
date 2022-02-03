import { Router } from 'express'
import { createUser, getAllUsers, getUserById } from '../controllers/user.controller'
import { authentication } from '../middlewares/authentication'
import { validateDataSchema } from '../middlewares/validateDataSchema'
import { userSchema } from '../schemas/userSchema'

const router = Router()

export const userRouter = () => {
  router.post('', validateDataSchema(userSchema), createUser)
  router.get('', authentication, getAllUsers)
  router.get('/:id', authentication, getUserById)
  
  return router
}