import { prisma } from "../app";
import { Role } from "@prisma/client"; // Usa el modelo generado por Prisma

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const createUser = async (name: string, email: string, password: string, role: Role) => {
  return await prisma.user.create({
    data: {
      name,
      email,
      password,
      role,
    },
  });
};


export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({ where: { id } });
};
