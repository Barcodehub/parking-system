import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError, ValidationError } from '../errors/appError';

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', error); // Log de error pa debugging

  // Manejo de ZodError (validaciones y eso)
  if (error instanceof ZodError) {
    const validationError = new ValidationError(
      error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
    );
    return res.status(validationError.statusCode).json({
      message: validationError.message,
      errors: validationError.details,
    });
  }

  // Manejo del  AppError
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
      ...(error.details && { details: error.details }),
    });
  }

  // pa un Error inesperado (500)
  const statusCode = 500;
  const message = error instanceof Error ? error.message : 'Internal server error';
  
  res.status(statusCode).json({
    status: 'error',
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && {
      stack: error instanceof Error ? error.stack : undefined,
    }),
  });
};