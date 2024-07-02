import { Request, Response, NextFunction } from 'express'
import { body, validationResult, ValidationChain } from 'express-validator'
import { NotFoundError, BadRequestError } from '../errors/index.errors' // Adjust the import path as per your project structure

const withValidationErrors = (
  validateValues: ValidationChain[]
): ((req: Request, res: Response, next: NextFunction) => void)[] => {
  return [
    ...validateValues,
    (req: Request, res: Response, next: NextFunction): void => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg)

        if (errorMessages[0].startsWith('no product')) {
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
