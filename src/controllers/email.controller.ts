import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { User } from '../entities/user.entities'
import { mailOptions, transport } from '../services/email.service'

export const sendEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body
  const userRepository = getRepository(User)

  try {
    const user = await userRepository.findOne({email})
    
    if (user) {
      const options = mailOptions([email], 'wellcome', 'register_email', {
        user: user?.name
      })
    
      transport.sendMail(options, (err, info) => {
        if (err) {
          next(err)
        } else {
          return res.json(info.envelope)
        }
      })
    }
  } catch (err) {
    next(err)
  }
}