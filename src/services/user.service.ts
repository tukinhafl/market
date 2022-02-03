import { getRepository } from "typeorm";
import { ILoginProps, IUserProps } from "../@types";
import { User } from "../entities/user.entities";
import { AppError } from "../errors/appError";
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Cart } from "../entities/cart.entities";

export const createUserService = async (data: IUserProps) => {
  const { email } = data
  data.password = bcrypt.hashSync(data.password, 10)

  try {
    const userRepository = getRepository(User)
    const cartRepository = getRepository(Cart)
    let user = await userRepository.findOne({ email }) 
    
    if (!user) {
      const cart = cartRepository.create()
      await cartRepository.save(cart)

      data.cart = cart

      user = userRepository.create(data)
      await userRepository.save(user)

      return user
    } else {
      throw new AppError('Email already exists', 400)
    }

  } catch (err) {
    throw new AppError((err as any).message, 400)
  }
}

export const loginService = async (data: ILoginProps) => {
  const { email, password } = data
  const userRepository = getRepository(User)

  try {
    let user = await userRepository.findOne({ email })
  
    if (user) {
      const match = await bcrypt.compare(password, user.password)
  
      if (!match) {
        throw new AppError('Email or password incorrect', 401)
      }
  
      const token = jwt.sign({ user: user }, 'secret', {
        expiresIn: process.env.EXPIRES_IN
      })
  
      return token
    }
  } catch (e) {
    throw new AppError((e as any).message, 404)
  }
}

export const getAllUsersService = async (isAdm: boolean) => {
  if (isAdm) {
    const userRepository = getRepository(User)
    const users = await userRepository.find({
      select: ['id', 'email', 'name', 'adm']
    })
  
    return users
  } else {
    throw new AppError('Only adm can access', 401)
  }
}

export const getUserByIdService = async (isAdm: Boolean, tokenId: string, id: string) => {
  const userRepository = getRepository(User)
  
  if (isAdm) {
    const user = await userRepository.findOne({ id }, {
      select: ['id', 'email', 'name', 'adm']
    })

    return user
  } else {
    if (tokenId === id) {
      const user = await userRepository.findOne({ id }, {
        select: ['id', 'email', 'name', 'adm']
      })
      
      return user
    } else {
      throw new AppError('Unsufficient permission', 401)
    }
  }
}