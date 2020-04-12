export class NotAuthorisedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotAuthorisedError';
    Error.captureStackTrace(this, NotAuthorisedError);
  }
}
