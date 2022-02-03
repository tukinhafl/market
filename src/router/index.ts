import { Express } from 'express'
import { buyRouter } from './buy.router'
import { cartRouter } from './cart.router'
import { emailRouter } from './email.router'
import { loginRouter } from './login.router'
import { productRouter } from './product.router'
import { recoverRouter } from './recover_pass.router'
import { userRouter } from './user.router'

export const initializerRouter = (app: Express) => {
  app.use('/api/user', userRouter())
  app.use('/api/login', loginRouter())
  app.use('/api/product', productRouter())
  app.use('/api/cart', cartRouter())
  app.use('/api/buy', buyRouter())
  app.use('/api/email', emailRouter())
  app.use('/api', recoverRouter())
}