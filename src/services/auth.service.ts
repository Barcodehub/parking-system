import jwt from "jsonwebtoken";
import { JWT_SECRET, TOKEN_EXPIRATION } from "../config/env";
import { findUserByEmail } from "../repositories/user.repository";
import bcrypt from "bcryptjs";
import * as userRepository from '../repositories/user.repository';
import { CreateUserInput, UserWithoutPassword } from '../types/user.types';

export const login = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
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
    throw new Error('Invalid email format');
  }

  // Validar contraseña
  if (!isValidPassword(password)) {
    throw new Error('Password must be at least 8 characters long');
  }

  const existingUser = await userRepository.findUserByEmail(email);

  if (existingUser) {
    throw new Error('User already exists');
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