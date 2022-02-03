import { NextFunction, Request, Response } from 'express'
import { addProductService, deleteProductFromCartService, getAllCartsService, getUserCartService } from '../services/cart.service'

export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body
  const tokenId = req.id

  try {
    const product = await addProductService(name, tokenId)

    return res.status(201).json(`Product ${product.name} added to cart.`)
  } catch (err) {
    next(err)
  }
}

export const getUserCart = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const tokenId = req.id
  const isAdm = req.auth

  try {
    const cart = await getUserCartService(id, tokenId, isAdm)

    return res.json(cart)
  } catch (err) {
    next(err)
  }
}

export const getAllCarts = async (req: Request, res: Response, next: NextFunction) => {
  const isAdm = req.auth

  try {
    const carts = await getAllCartsService(isAdm)

    res.json(carts)
  } catch (err) {
    next(err)
  }
}

export const deleteProductFromCart = async (req: Request, res: Response, next: NextFunction) => {
  const { product_id } = req.params
  const isAdm = req.auth
  const tokenId = req.id
  const { cartId } = req.body
  
  try {
    await deleteProductFromCartService(cartId, isAdm, product_id, tokenId)
    
    return res.status(204).json()
  } catch (err) {
    next(err)
  }
}