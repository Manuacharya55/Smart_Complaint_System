class ApiError extends Error {
  constructor(statuscode, message = "something went wrong", errors = []) {
    super(message);
    this.statuscode = statuscode;
    this.success = false;
    this.message = message;
    this.data = [];
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError