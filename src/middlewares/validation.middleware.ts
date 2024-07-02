import { Request, Response, NextFunction } from 'express'
import {
  body,
  validationResult,
  ValidationChain,
  param,
} from 'express-validator'
import { NotFoundError, BadRequestError } from '../errors/index.errors'
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
          throw new NotFoundError(errorMessages.join(', '))
        }

        throw new BadRequestError(errorMessages.join(', '))
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
      throw new BadRequestError('Invalid ID format')
    }

    const product = await prisma.product.findUnique({ where: { id } })

    if (!product) {
      throw new NotFoundError(`No product with id ${id}`)
    }
  }),
])
