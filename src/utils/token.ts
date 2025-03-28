import jwt from 'jsonwebtoken';
import config from '../config/jwt';

interface TokenPayload {
  id: number;
  role: string;
}

export const generateToken = (payload: TokenPayload): string => {
  // Solución: Asegurar que secret es string y añadir tipo a options
  return jwt.sign(
    payload, 
    config.secret as string, // Conversión explícita a string
    { 
      expiresIn: config.expiresIn,
      algorithm: 'HS256' // Especificar algoritmo explícitamente
    } as jwt.SignOptions // Tipo explícito para las opciones
  );
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, config.secret as string) as TokenPayload;
};