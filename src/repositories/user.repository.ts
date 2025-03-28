import prisma from '../config/database';
import { User } from '../models/user.model';
import { CreateUserDTO } from '../dtos/user.dto';

export class UserRepository {
  async create(userData: CreateUserDTO): Promise<User> {
    return prisma.user.create({
      data: userData,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }
}