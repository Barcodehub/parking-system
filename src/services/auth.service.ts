import jwt from "jsonwebtoken";
import { JWT_SECRET, TOKEN_EXPIRATION } from "../config/env";
import { findUserByEmail } from "../repositories/user.repository";
import bcrypt from "bcryptjs";
import * as userRepository from '../repositories/user.repository';
import { CreateUserInput, UserWithoutPassword } from '../types/user.types';
import { ConflictError, NotFoundError, UnauthorizedError, ValidationError } from "../errors/appError";


export const login = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new NotFoundError('User no encontrado');
  }
  
  if (!(await bcrypt.compare(password, user.password))) {
    throw new UnauthorizedError('Invalida contraseña');
  }
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRATION,
  });
  return { token, user };
};



export const registerUser = async (userData: CreateUserInput): Promise<UserWithoutPassword> => {
  const { email, password } = userData;
  
  // Validar email
  if (!isValidEmail(email)) {
    throw new ValidationError('Invalid email formato');
  }

  // Validar contraseña
  if (!isValidPassword(password)) {
    throw new ValidationError('La contraseña debe ser al menos de 8 digitos de longitud');
  }

  const existingUser = await userRepository.findUserByEmail(email);

  if (existingUser) {
    throw new ConflictError('El usuario ya existe');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = await userRepository.createUser({
    ...userData,
    password: hashedPassword,
  });

  // Excluir el password al retornar
  const { password: _, ...userWithoutPassword } = newUser;
  
  return userWithoutPassword;
};


// Helper functions
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password: string): boolean => {
  return password.length >= 8;
};