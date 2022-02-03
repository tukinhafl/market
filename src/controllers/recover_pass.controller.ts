import { NextFunction, Request, Response } from 'express'
import { mailOptions, transport } from '../services/email.service'
import { changePassService, recoverPassService } from '../services/recover_pass.service'

export const recoverPass = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body

  try {
    const random = await recoverPassService(email)
    const options = mailOptions([email], 'Password recovery', 'recover_pass', {
      recover_code: random
    })

    transport.sendMail(options, (err, info) => {
      if (err) {
        next(err)
      } else {
        return res.json("Recovery code sent successfully")
      }
    })
  } catch (err) {
    next(err)
  }
}

export const changePass = async (req: Request, res: Response, next: NextFunction) => {
  const { recovery_code, new_password } = req.body
  const tokenId = req.id

  try {
    const msg = await changePassService(recovery_code, tokenId, new_password)

    res.json(msg)
  } catch (err) {
    next(err)
  }
}