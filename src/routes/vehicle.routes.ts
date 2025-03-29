import { Router } from 'express';
import { registerEntry, registerExit } from '../controllers/vehicle.controller';
import { protect, isSocio } from '../middlewares/auth.middleware';
const router = Router();

router.post('/entry', protect, isSocio, registerEntry);
router.post('/exit', registerExit);

export default router;