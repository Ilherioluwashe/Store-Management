import jwt from 'jsonwebtoken'
import { JWTPayload } from '../dtos/authentication.interface'

export const createJWT = (payload: JWTPayload): string => {
  const expiresIn = process.env.JWT_EXPIRES_IN
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn,
  })
  return token
}

export const verifyJWT = (token: string): JWTPayload => {
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as JWTPayload
  return decoded
}
