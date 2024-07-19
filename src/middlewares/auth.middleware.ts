import { Response, NextFunction } from 'express'
import CustomError from '../errors/index.errors'
import { verifyJWT } from '../utils/token.utils'
import { AuthenticatedRequest } from '../dtos/authentication.interface'
import prisma from '../models/index.models'

export const authenticateUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const { token } = req.cookies
  if (!token) {
    next(new CustomError.UnauthenticatedError('Authentication invalid'))
    return
  }

  try {
    const payload = verifyJWT(token)
    req.user = {
      id: payload.userId,
      role: payload.role,
    }
    next()
  } catch (error) {
    next(new CustomError.UnauthenticatedError('Authentication invalid'))
  }
}

export const authorizedPermissions = (options: {
  roles?: string[]
  allowSameUser?: boolean
}) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    if (!req.user) {
      return next(
        new CustomError.UnauthenticatedError('Authentication required')
      )
    }

    const { roles, allowSameUser } = options
    const userIdFromParam = parseInt(req.params.id, 10)

    if (req.path.includes('/')) {
      const staffCount = await prisma.staff.count()
      if (staffCount === 0) {
        return next()
      }
    }

    if (
      allowSameUser &&
      !isNaN(userIdFromParam) &&
      req.user.id === userIdFromParam
    ) {
      return next()
    }

    if (roles && roles.includes(req.user.role)) {
      return next()
    }

    next(new CustomError.UnauthorizedError('Unauthorized to access this route'))
  }
}
