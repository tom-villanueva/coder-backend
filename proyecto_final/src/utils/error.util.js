export const ErrorCodes = Object.freeze({
  SERVER_ERROR: 1,
  BAD_REQUEST_ERROR: 2,
  NOT_FOUND_ERROR: 3,
  UNAUTHENTICATED_ERROR: 4,
  UNPROCESSABLE_CONTENT_ERROR: 5,
});

export class HttpError extends Error {
  constructor(message, statusCode, errorCode) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

export class ServerError extends HttpError {
  constructor(message) {
    super(`Internal Server Error: ${message}`, 500, ErrorCodes.SERVER_ERROR);
    this.name = "ServerError";
  }
}

export class BadRequestError extends HttpError {
  constructor(message) {
    super(`Bad request: ${message}`, 400, ErrorCodes.BAD_REQUEST_ERROR);
    this.name = "BadRequestError";
  }
}

export class NotFoundError extends HttpError {
  constructor(message) {
    super(`Not found: ${message}`, 404, ErrorCodes.NOT_FOUND_ERROR);
    this.name = "NotFoundError";
  }
}

export class UnauthenticatedError extends HttpError {
  constructor(message) {
    super(`Unauthenticated: ${message}`, 401, ErrorCodes.UNAUTHENTICATED_ERROR);
    this.name = "UnauthenticatedError";
  }
}

export class UnprocessableContentError extends HttpError {
  constructor(message) {
    super(
      `Unprocessable Content: ${message}`,
      422,
      ErrorCodes.UNPROCESSABLE_CONTENT_ERROR
    );
    this.name = "UnprocessableContentError";
  }
}
