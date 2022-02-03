import { getRepository } from "typeorm"
import { Cart } from "../entities/cart.entities"
import { Product } from "../entities/product.entities"
import { User } from "../entities/user.entities"
import { AppError } from "../errors/appError"

export const addProductService = async (name: string, owner_id: string) => {
  const userRepository = getRepository(User)
  const productRepository = getRepository(Product)
  const cartRepository = getRepository(Cart)

  try {
    const user = await userRepository.findOne(owner_id)
    const product = await productRepository.findOne({ name })
    const cart = await cartRepository.findOne(user?.cart.id)

    if (cart && product) {
      cart?.products.push(product)
      await cartRepository.save(cart)
      
      return product
    } else {
      throw new AppError("Product not found", 404)
    }
  } catch (err) {
    throw new AppError("Product not found", 404)
  }
}

export const getUserCartService = async (id: string, tokenId: string, isAdm: boolean) => {
  const userRepository = getRepository(User)
  const user = await userRepository.findOne(id)
  
  if (!user) {
    throw new AppError("User not found", 404)
  }
  
  if (isAdm) {
    const cart = user?.cart
    
    return cart
  } else {
    
    if (id === tokenId) {
      const user = await userRepository.findOne(id)
      const cart = user?.cart
      
      return cart
    } else {
      throw new AppError("Unsifficient permission", 401)
    }
  }
}

export const getAllCartsService = async (isAdm: boolean) => {
  const cartRepository = getRepository(Cart)

  if (isAdm) {
    const carts = await cartRepository.find()

    return carts
  } else {
    throw new AppError("Unsufficient permission", 401)
  }
}

export const deleteProductFromCartService = async (cartId: string, isAdm: boolean, product_id: string, tokenId: string) => {
  const cartRepository = getRepository(Cart)
  const productRepository = getRepository(Product)
  const userRepository = getRepository(User)
  let cart

  try {
    await productRepository.findOne(product_id)
  } catch (e) {
    throw new AppError("Product not found", 404)
  }

  try {
    cart = await cartRepository.findOne(cartId)
  } catch (e) {
    throw new AppError("Cart not found", 404)
  }

  const user = await userRepository.findOne(tokenId)
  
  if (cart?.products.find(el => el.id === product_id)) {
    if (isAdm) {
      cart.products = cart?.products.filter(el => el.id !== product_id)
      await cartRepository.save(cart)
    } else {
      if (cart?.id === user?.cart.id) {
        cart.products = cart?.products.filter(el => el.id !== product_id)
        await cartRepository.save(cart)
      } else {
        throw new AppError("Unsifficient permission", 401)
      }
    }
  }
  else {
    throw new AppError("Product doesn't exists in cart", 404)
  }
}