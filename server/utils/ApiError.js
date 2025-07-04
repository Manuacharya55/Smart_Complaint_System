
export class ApiError extends Error {
  constructor(statusCode, message, errors) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.message = message;
    this.data = [];
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}
