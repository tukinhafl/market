import { Router } from 'express'
import { sendEmail } from '../controllers/email.controller'
import { authentication } from '../middlewares/authentication'

const router = Router()

export const emailRouter = () => {
  router.post('', authentication, sendEmail)
  
  return router
}