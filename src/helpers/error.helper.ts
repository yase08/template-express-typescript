// Berfungsi untuk menangani pesan error

export class ExpressError extends Error {
  public name: string;
  public message: string = "";

  constructor(message: string) {
    super(message);

    this.name = this.constructor.name;
    this.message = this.message;

    Error.captureStackTrace(this, this.constructor);
  }
}
