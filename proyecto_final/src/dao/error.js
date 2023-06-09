export class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class ServerError extends HttpError {
  constructor(message) {
    super(`Internal Server Error: ${message}`, 500);
    this.name = "NotFoundError";
  }
}

export class BadRequestError extends HttpError {
  constructor(message) {
    super(`Bad request: ${message}`, 400);
    this.name = "BadRequestError";
  }
}

export class NotFoundError extends HttpError {
  constructor(message) {
    super(`Not found: ${message}`, 404);
    this.name = "NotFoundError";
  }
}
