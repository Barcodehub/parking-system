import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
export const TOKEN_EXPIRATION = "6h";
export const DATABASE_URL = process.env.DATABASE_URL || "";

// src/models/user.model.ts
// import { Role } from "@prisma/client";
// export interface IUser {
//   id?: number;
//   name: string;
//   email: string;
//   password: string;
//   role?: Role;
// }