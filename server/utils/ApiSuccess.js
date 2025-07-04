
export class ApiSuccess {
  constructor(statusCode, message, data) {
    this.statusCode = statusCode;
    this.success = true;
    this.message = message;
    this.data = data;
  }
}
