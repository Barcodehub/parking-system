import express from "express";
import authRoutes from "./routes/auth.routes";
import parkingRouter from "./routes/parking.routes";
import vehicleRouter from './routes/vehicle.routes';
import { PrismaClient } from "@prisma/client";
import seedAdminUser from "./config/seed";


const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use('/parkings', parkingRouter);
app.use('/vehicles', vehicleRouter);

export const prisma = new PrismaClient({
    log:['query']
});
seedAdminUser()


export default app;
