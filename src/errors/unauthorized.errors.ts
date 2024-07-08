import { StatusCodes } from 'http-status-codes'
import CustomAPIError from './custom-api.error'

class UnauthorizedError extends CustomAPIError {
  statusCode: Number

  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.FORBIDDEN
  }
}
export default UnauthorizedError