import { Router } from 'express'
import { createProduct, getAllProducts, getProductById } from '../controllers/product.controller'
import { authentication } from '../middlewares/authentication'
import { validateDataSchema } from '../middlewares/validateDataSchema'
import { productSchema } from '../schemas/productSchema'

const router = Router()

export const productRouter = () => {
  router.post('', authentication, validateDataSchema(productSchema), createProduct)
  router.get('/:id', authentication, getProductById)
  router.get('/', authentication, getAllProducts)
  
  return router
}