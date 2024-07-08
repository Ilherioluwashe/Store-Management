import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { loginService, logoutService } from '../services/auth.service'
import UnauthenticatedError from '../errors/unauthenticated.error'

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body
    const token = await loginService(email, password)

    const oneDay = 1000 * 60 * 60 * 24

    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === 'production',
    })
    res.status(StatusCodes.OK).json({ msg: 'user logged in' })
  } catch (error) {
    if (error instanceof UnauthenticatedError) {
      res.status(StatusCodes.UNAUTHORIZED).json({ msg: error.message })
    } else {
      console.error('Internal Server Error:', error)
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: 'Internal Server Error' })
    }
  }
}

export const logout = (req: Request, res: Response): void => {
  try {
    logoutService(res)
    res.status(StatusCodes.OK).json({ msg: 'user logged out!' })
  } catch (error) {
    console.error('Internal Server Error:', error)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: 'Internal Server Error' })
  }
}
