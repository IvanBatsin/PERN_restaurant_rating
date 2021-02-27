export class HttpError extends Error {
  constructor(public status: number = 500, public message: string = 'Server Error') {
    super(message);
  }
}