import { Request, Response, NextFunction } from 'express'
import {
  body,
  validationResult,
  ValidationChain,
  param,
} from 'express-validator'
import CustomError from '../errors/index.errors'
import prisma from '../models/index.models'

const withValidationErrors = (
  validateValues: ValidationChain[]
): ((req: Request, res: Response, next: NextFunction) => void)[] => {
  return [
    ...validateValues,
    (req: Request, res: Response, next: NextFunction): void => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg)

        if (errorMessages[0]) {
          throw new CustomError.NotFoundError(errorMessages.join(', '))
        }

        throw new CustomError.BadRequestError(errorMessages.join(', '))
      }
      next()
    },
  ]
}

export const validateProductInput = withValidationErrors([
  body('name').notEmpty().withMessage('Product name is required'),
  body('description').notEmpty().withMessage('Product description is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Product price is required'),
  body('quantity')
    .isInt({ min: 0 })
    .withMessage('Product quantity is required'),
])

export const validateProductIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const id = parseInt(value, 10)

    if (isNaN(id)) {
      throw new CustomError.BadRequestError('Invalid ID format')
    }

    const product = await prisma.product.findUnique({ where: { id } })

    if (!product) {
      throw new CustomError.NotFoundError(`No product with id ${id}`)
    }
  }),
])

export const validateCustomerIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const id = parseInt(value, 10)

    if (isNaN(id)) {
      throw new CustomError.BadRequestError('Invalid ID format')
    }

    const customer = await prisma.customer.findUnique({ where: { id } })

    if (!customer) {
      throw new CustomError.NotFoundError(`No customer with id ${id}`)
    }
  }),
])

export const validateCustomerInput = withValidationErrors([
  body('name').notEmpty().withMessage('Customer name is required'),
  body('email')
    .notEmpty()
    .withMessage('Customer email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (email: string) => {
      const user = await prisma.customer.findUnique({
        where: { email },
      })
      if (user) {
        throw new CustomError.BadRequestError('Email already exists')
      }
    }),
  body('phoneNumber')
    .notEmpty()
    .withMessage('Customer phone number is required')
    .isLength({ min: 10 })
    .withMessage('Phone number must be at least 10 characters long'),
  body('address').notEmpty().withMessage('Customer address is required'),
])
export const validateStaffInput = withValidationErrors([
  body('name').notEmpty().withMessage('Staff name is required'),
  body('email')
    .notEmpty()
    .withMessage('Staff email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (email: string) => {
      const user = await prisma.staff.findUnique({
        where: { email },
      })

      if (user) {
        throw new CustomError.BadRequestError('Email already exists')
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
])

export const validateStaffIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const id = parseInt(value, 10)

    if (isNaN(id)) {
      throw new CustomError.BadRequestError('Invalid ID format')
    }
    const isAdmin = req.user.role === 'Admin'

    const isOwner = req.user.id === id
    if (!isAdmin && !isOwner)
      throw new CustomError.UnauthorizedError(
        'not authorized to access this route'
      )

    const staff = await prisma.staff.findUnique({ where: { id } })

    if (!staff) {
      throw new CustomError.NotFoundError(`No staff with id ${id}`)
    }
  }),
])

export const validateOrderInput = withValidationErrors([
  body('customerId').notEmpty().withMessage('Customer Id is required'),
  body('items').custom(async (cartItems: any[]) => {
    if (!cartItems || cartItems.length < 1) {
      throw new CustomError.BadRequestError('No cart items provided')
    }
  }),
])
