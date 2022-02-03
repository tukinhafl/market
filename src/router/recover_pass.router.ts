import { Router } from 'express'
import { changePass, recoverPass } from '../controllers/recover_pass.controller'
import { authentication } from '../middlewares/authentication'

const router = Router()

export const recoverRouter = () => {
  router.post('/recuperar', recoverPass)
  router.post('/alterar_senha', authentication, changePass)
  
  return router
}