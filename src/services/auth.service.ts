import jwt from "jsonwebtoken";
import { JWT_SECRET, TOKEN_EXPIRATION } from "../config/env";
import { createUser, findUserByEmail } from "../repositories/user.repository";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";

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




export const createSocioService = async (
  name: string,
  email: string,
  password: string
)=> {
  // Verifica si el email ya está registrado
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("El correo electrónico ya está registrado");
  }

  // Hashea la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crea el nuevo usuario con rol SOCIO
  return await createUser(name, email, hashedPassword);
};