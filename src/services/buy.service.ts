import { getRepository } from "typeorm"
import { Cart } from "../entities/cart.entities"
import { Purchase } from "../entities/purchase.entities"
import { User } from "../entities/user.entities"
import { AppError } from "../errors/appError"

export const finishBuyingService = async (tokenId: string) => {
  const userRepository = getRepository(User)
  const purchaseRepository = getRepository(Purchase)

  try {
    const user = await userRepository.findOne(tokenId)

    if (user) {
      const purchase = purchaseRepository.create()
      purchase.owner = user
      purchase.cart_id = user.cart.id
      await purchaseRepository.save(purchase)

      return {
        purchase_owner: user.id,
        purchase_owner_email: user.email,
        purchase_owner_name: user.name,
        purchase_products: user.cart.products,
        purchase_id: purchase.id
      }
    }
  } catch (e) {
    throw new AppError("User not found", 404)
  }
}

export const getPurchaseByIdService = async (purchase_id: string, tokenId: string, isAdm: boolean) => {
  const purchaseRepository = getRepository(Purchase)
  const cartRepository = getRepository(Cart)

  const purchase = await purchaseRepository.findOne(purchase_id)
  const cart = await cartRepository.findOne(purchase?.cart_id)
  
  if (isAdm) {

    return {
      purchase: purchase,
      purchase_products: cart?.products
    }
  } else {
    if (tokenId === purchase?.owner.id) {

      return {
        purchase: purchase,
        purchase_products: cart?.products
      }
    } else {
      throw new AppError("Unsufficient permission", 401)
    }
  }
}

export const getAllPurchasesService = (isAdm: boolean) => {
  const purchaseRepository = getRepository(Purchase)

  if (isAdm) {
    const purchases = purchaseRepository.find()

    return purchases
  } else {
    throw new AppError("Unsufficient permission", 401)
  }
}