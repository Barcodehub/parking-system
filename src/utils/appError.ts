export class AppError extends Error {
  constructor(public message: string, public statusCode: number = 400) {
    super(message);
  }
}

export class UserAlreadyExistsError extends AppError {
  constructor() {
    super('User already exists', 409);
  }
}

export class InvalidEmailError extends AppError {
  constructor() {
    super('Invalid email format', 400);
  }
}