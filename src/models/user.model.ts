// Con Prisma, los modelos están definidos en schema.prisma
// Este archivo es opcional pero lo mantenemos para consistencia con el patrón
export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  }