class ApiError extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }

  static badRequest(message: string) {
    return new ApiError(404, message)
  }

  static internal(message: string) {
    return new ApiError(500, message)
  }

  static forbiden(message: string) {
    return new ApiError(403, message)
  }
  static badUser(message: string) {
    return new ApiError(409, message)
  }
}

export default ApiError
