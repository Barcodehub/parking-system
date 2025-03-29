import { prisma } from "../app";
import { Role } from "@prisma/client"; // Usa el modelo generado por Prisma
import { User, CreateUserInput, UserWithoutPassword } from '../types/user.types';

export const findUserByEmail = async (email: string) : Promise<User | null> => {
  return await prisma.user.findUnique({ where: { email } });
};

export const createUser = async (userData: CreateUserInput): Promise<User> => {
  return await prisma.user.create({
    data: {
      ...userData,
      role: Role.SOCIO, 
    },
  });
};


export const getUserById = async (id: number) : Promise<User | null>  => {
  return await prisma.user.findUnique({ where: { id } });
};
