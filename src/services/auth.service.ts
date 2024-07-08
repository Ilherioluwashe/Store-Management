import prisma from '../models/index.models'
import { compare } from 'bcryptjs'
import { createJWT } from '../utils/token.utils'
import UnauthenticatedError from '../errors/unauthenticated.error'
import { Response } from 'express'

export const loginService = async (
  email: string,
  password: string
): Promise<string> => {
  const user = await prisma.staff.findUnique({
    where: { email },
  })

  if (!user || !(await compare(password, user.password))) {
    throw new UnauthenticatedError('Invalid credentials')
  }

  const token = createJWT({ userId: user.id, role: user.role })
  return token
}

export const logoutService = (res: Response): void => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
}
