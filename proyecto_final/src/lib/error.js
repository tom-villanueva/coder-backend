export class HttpError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
	}
}

export class BadRequestError extends HttpError {
	constructor(message) {
		super(`Bad request: ${message}`, 400);
	}
}

export class NotFoundError extends HttpError {
	constructor(message) {
		super(`Not found: ${message}`, 404);
	}
}