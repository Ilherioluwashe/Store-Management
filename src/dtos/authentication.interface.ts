import { Request } from 'express'

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number
    role: string
  }
}

export interface JWTPayload {
  userId: number
  role: string
}
