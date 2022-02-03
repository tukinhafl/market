import { NextFunction, Request, Response } from 'express'
import { finishBuyingService, getAllPurchasesService, getPurchaseByIdService } from '../services/buy.service'
import { mailOptions, transport } from '../services/email.service'

export const finishBuying = async (req: Request, res: Response, next: NextFunction) => {
  const tokenId = req.id

  try {
    const purchase = await finishBuyingService(tokenId)
    const total = purchase?.purchase_products.reduce((acc, cur) => acc + cur.price, 0)

    if (purchase) {
      const options = mailOptions(
        [purchase?.purchase_owner_email],
        'Confirmação de compra',
        'email',
        {
          name: purchase?.purchase_owner_name,
          total: total,
          nota_fiscal: purchase?.purchase_id
        }
      )

      transport.sendMail(options, (err, info) => {
        if (err) {
          return console.log(err)
        } else {
          console.log(info)
        }
      })
    }

    return res.json(purchase)
  } catch (err) {
    next(err)
  }
}

export const getPurchaseById = async (req: Request, res: Response, next: NextFunction) => {
  const { purchase_id } = req.params
  const tokenId = req.id
  const isAdm = req.auth
  
  try {
    const purchase = await getPurchaseByIdService(purchase_id, tokenId, isAdm)

    return res.json(purchase)
  } catch (err) {
    next(err)
  }
}

export const getAllPurchases = async (req: Request, res: Response, next: NextFunction) => {
  const isAdm = req.auth

  try {
    const purchases = await getAllPurchasesService(isAdm)

    return res.json(purchases)
  } catch (err) {
    next(err)
  }
}