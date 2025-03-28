import jwt from "jsonwebtoken";
import { JWT_SECRET, TOKEN_EXPIRATION } from "../config/env";
import { findUserByEmail } from "../repositories/user.repository";
import bcrypt from "bcryptjs";

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
