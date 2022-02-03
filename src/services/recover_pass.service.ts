import { getRepository } from "typeorm"
import { User } from "../entities/user.entities"
import * as bcrypt from 'bcrypt'
import { AppError } from "../errors/appError"

export const recoverPassService = async (email: string) => {
  const userRepository = getRepository(User)
  let user = await userRepository.findOne({ email })
  let random = Math.floor(Math.random() * (9999 - 1000) + 1000).toString()

  if (user) {
    user.reset_link = bcrypt.hashSync(random, 10)
    await userRepository.save(user)
  }

  return random
}

export const changePassService = async (code: string, tokenId: string, new_password: string) => {
  const userRepository = getRepository(User)
  const user = await userRepository.findOne(tokenId)

  if (user) {
    const match = await bcrypt.compare(code, user.reset_link)

    if (!match) {
      throw new AppError("Wrong code", 401)
    }

    user.password = bcrypt.hashSync(new_password, 10)
    await userRepository.save(user)

    return "Password changed successfully"
  }
}