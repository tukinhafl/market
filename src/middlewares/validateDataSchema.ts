import { NextFunction, Request, Response } from "express";
import { AnyObjectSchema } from "yup";
import { AppError } from "../errors/appError";

export const validateDataSchema = (schema: AnyObjectSchema) => async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body

  try {
    await schema.validate(data, { abortEarly: false, stripUnknown: true })
    return next()
  } catch (e) {
    next(new AppError({ [(e as any).name]: (e as any).errors }, 400))
  }
}