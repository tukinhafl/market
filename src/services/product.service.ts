import { getRepository } from "typeorm";
import { IProductProps } from "../@types";
import { AppError } from "../errors/appError";
import { Product } from "../entities/product.entities";

export const createProductService = async (data: IProductProps, isAdm: boolean) => {
  const { name } = data
  if (isAdm) {
    try {
      const productRepository = getRepository(Product)
      let product = await productRepository.findOne({ name }) 
      
      if (!product) {
        product = productRepository.create(data)
    
        await productRepository.save(product)
    
        return product
      } else {
        throw new AppError('Product already registered', 400)
      }
  
    } catch (err) {
      throw new AppError((err as any).message, 400)
    }
  } else {
    throw new AppError('Unsifficient permission', 401)
  }
}

export const getProductByIdService = async (id: string) => {
  const productRepository = getRepository(Product)
  try {
    const product = await productRepository.findOne({ id })
  
    return product
  } catch (err) {
    throw new AppError("Product not found", 404)
  }
}

export const getAllProductsService = async () => {
  const productRepository = getRepository(Product)
  const products = await productRepository.find()

  return products
}