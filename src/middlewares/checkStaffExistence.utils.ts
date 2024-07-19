import { Request, Response, NextFunction } from 'express'
import prisma from '../models/index.models'
import { authenticateUser } from './auth.middleware'
import { AuthenticatedRequest } from '../dtos/authentication.interface'
import CustomError from '../errors/index.errors'

export const checkStaffExistence = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const staffCount = await prisma.staff.count()
    if (staffCount === 0) {
      return next()
    } else {
      authenticateUser(req as AuthenticatedRequest, res, next)
    }
  } catch (error) {
    next(new CustomError.BadRequestError('Error checking staff existence'))
  }
}
