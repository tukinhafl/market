import { NextFunction, Request, Response } from 'express'
import { createProductService, getAllProductsService, getProductByIdService } from '../services/product.service'

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await createProductService(req.body, req.auth)

    return res.status(201).json(product)
  } catch (err) {
    next(err)
  }
}

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  try {
    const product = await getProductByIdService(id)

    return res.json(product)
  } catch (err) {
    next(err)
  }
}

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await getAllProductsService()

    return res.json(products)
  } catch (err) {
    next(err)
  }
}