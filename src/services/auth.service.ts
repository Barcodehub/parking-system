import jwt from "jsonwebtoken";
import { JWT_SECRET, TOKEN_EXPIRATION } from "../config/env";
import { createUser, findUserByEmail } from "../repositories/user.repository";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

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




export const registerUser = async (name: string, email: string, password: string) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error('User already exists!');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return await createUser(name, email, hashedPassword, Role.SOCIO);
};