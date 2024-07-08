import { Request, Response, NextFunction } from 'express'
import { UnauthenticatedError, UnauthorizedError } from '../errors/index.errors'
import { verifyJWT } from '../utils/token.utils'

interface AuthenticatedRequest extends Request {
  user?: {
    id: number
    role: string
  }
}

export const authenticateUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const { token } = req.cookies
  if (!token) {
    next(new UnauthenticatedError('Authentication invalid'))
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
    next(new UnauthenticatedError('Authentication invalid'))
  }
}

export const authorizedPermissions = (...roles: string[]) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {
    const userIdFromParam = parseInt(req.params.userId, 10)
    if (
      req.user &&
      (roles.includes(req.user.role) || req.user.id === userIdFromParam)
    ) {
      next()
    } else {
      next(new UnauthorizedError('Unauthorized to access this route'))
    }
  }
}
