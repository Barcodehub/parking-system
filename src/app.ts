import 'express-async-errors';
import express from "express";
import { PrismaClient } from "@prisma/client";
import seedAdminUser from "./config/seed";
import { errorHandler } from './middlewares/errorHandler.middleware';
import routes from './routes'; 


const app = express();
app.use(express.json());

app.use(routes);
app.use(errorHandler);

export const prisma = new PrismaClient({
  //  log:['query']
});
seedAdminUser() 


export default app;
