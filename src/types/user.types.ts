import { Role } from "@prisma/client";

export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
  };
  
  export type CreateUserInput = {
    name: string;
    email: string;
    password: string;
    role?: Role; // Opcional porque tiene valor por defecto
  };
  
  export type UserWithoutPassword = Omit<User, 'password'>;