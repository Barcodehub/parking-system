import express from "express";
import authRoutes from "./routes/auth.routes";
import { PrismaClient } from "@prisma/client";
import seedAdminUser from "./config/seed";
//import "./types/express";

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);

export const prisma = new PrismaClient({
    log:['query']
});
seedAdminUser()


export default app;
