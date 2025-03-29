import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
export const TOKEN_EXPIRATION = "6h";
export const DATABASE_URL = process.env.DATABASE_URL || "";
