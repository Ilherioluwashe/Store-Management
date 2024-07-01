class CustomAPIError extends Error {
  statusCode: any
  static BadRequestError: any
  constructor(message: string) {
    super(message)
    this.name = 'CustomAPIError'
  }
}

export default CustomAPIError
