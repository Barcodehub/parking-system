import prisma from "../config/prisma";
import { Role, User } from "@prisma/client"; // Usa el modelo generado por Prisma
import bcrypt from "bcryptjs";

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const createUser = async (
  name: string,
  email: string,
  password: string
)=> {
  return await prisma.user.create({
    data: {
      name,
      email,
      password,
      role: Role.SOCIO,
    },
  });
};


export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({ where: { id } });
};
