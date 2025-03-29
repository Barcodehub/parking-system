import { Router } from 'express';
import { getVehiclesByParking, registerEntry, registerExit } from '../controllers/vehicle.controller';
import { protect, isSocio, isAdmin} from '../middlewares/auth.middleware';
const router = Router();

router.post('/entry', protect, isSocio, registerEntry);
router.post('/exit', protect, isSocio, registerExit);

export default router;