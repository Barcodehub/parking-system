import prisma from "../config/prisma";
import { IUser } from "../models/user.model";
import bcrypt from "bcryptjs";

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const createUser = async (user: IUser) => {
  user.password = await bcrypt.hash(user.password, 10);
  return await prisma.user.create({ data: user });
};