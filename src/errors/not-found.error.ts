import { StatusCodes } from 'http-status-codes'
import CustomAPIError from './custom-api.error'

export class NotFoundError extends CustomAPIError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND)
  }
}

export default NotFoundError
