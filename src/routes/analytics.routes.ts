import { Router } from 'express';
import {
  getTopVehiclesGlobal,
  getTopVehiclesByParking,
  getFirstTimeParked,
  getParkingEarnings,
  getTopSocios,
  getTopParkings
} from '../controllers/analytics.controller';
import { isAdmin, isSocio, protect } from '../middlewares/auth.middleware';

const router = Router();

router.get('/vehicles/top-global',protect, getTopVehiclesGlobal);
router.get('/parking/:parkingId/vehicles/top',protect, getTopVehiclesByParking);
router.get('/parking/:parkingId/vehicles/first-time',protect, getFirstTimeParked);
router.get('/parking/:parkingId/earnings',protect, isSocio, getParkingEarnings);
router.get('/socios/top',protect, isAdmin, getTopSocios);
router.get('/parkings/top',protect, isAdmin, getTopParkings);

export default router;