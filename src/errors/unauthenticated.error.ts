import { StatusCodes } from 'http-status-codes'
import CustomAPIError from './custom-api.error'

class UnauthenticatedError extends CustomAPIError {
  statusCode: Number

  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}
export default UnauthenticatedError
