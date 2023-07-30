export class ApplicationError extends Error {
  status?: number;
  constructor({ status, message }: { status?: number; message: string }) {
    super(message);
    Object.setPrototypeOf(this, ApplicationError.prototype);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
  }
}

export * from './brand-errors/brand.errors';
