import { StatusCodes } from 'http-status-codes'
import CustomAPIError from './custom-api.error'

export class UnauthorizedError extends CustomAPIError {
  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN)
  }
}

export default UnauthorizedError
