import { NextFunction, Request, Response } from 'express'
import { createUserService, getAllUsersService, getUserByIdService, loginService } from '../services/user.service'

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await createUserService(req.body)
  
    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdm: user.adm
    })
  } catch (err) {
    next(err)
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await loginService(req.body)
    
    return res.json({ access_token: token })
  } catch (err) {
    next(err)
  }
}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsersService(req.auth as boolean)
    return res.json(users)
  } catch (err) {
    next(err)
  }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const isAdm = req.auth
  const tokenId = req.id
  
   try {
     const user = await getUserByIdService(isAdm, tokenId, id)

     return res.json(user)
   } catch (err) {
     next(err)
   }
}