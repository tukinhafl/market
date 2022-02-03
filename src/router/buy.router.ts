import { Router } from 'express'
import { finishBuying, getAllPurchases, getPurchaseById } from '../controllers/buy.controller'
import { authentication } from '../middlewares/authentication'

const router = Router()

export const buyRouter = () => {
  router.post('', authentication, finishBuying)
  router.get('/:id', authentication, getPurchaseById)
  router.get('', authentication, getAllPurchases)
  
  return router
}