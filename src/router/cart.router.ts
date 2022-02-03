import { Router } from 'express'
import { addProduct, deleteProductFromCart, getAllCarts, getUserCart } from '../controllers/cart.controller'
import { authentication } from '../middlewares/authentication'
import { validateDataSchema } from '../middlewares/validateDataSchema'
import { cartSchema } from '../schemas/cartSchema'

const router = Router()

export const cartRouter = () => {
  router.post('', authentication, validateDataSchema(cartSchema), addProduct)
  router.get('/:id', authentication, getUserCart)
  router.get('', authentication, getAllCarts)
  router.delete('/:product_id', authentication, deleteProductFromCart)
  
  return router
}