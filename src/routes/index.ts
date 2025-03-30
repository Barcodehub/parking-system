import { Router } from 'express';
import authRoutes from "./auth.routes";
import parkingRouter from "./parking.routes";
import vehicleRouter from './vehicle.routes';
import analyticsRouter from './analytics.routes';

const router = Router();

router.use("/auth", authRoutes);
router.use("/parkings", parkingRouter);
router.use("/vehicles", vehicleRouter);
router.use("/analytics", analyticsRouter);

export default router;
