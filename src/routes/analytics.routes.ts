import { Router } from 'express';
import {
  getTopVehiclesGlobal,
  getTopVehiclesByParking,
  getFirstTimeParked,
  getParkingEarnings,
  getTopSocios,
  getTopParkings
} from '../controllers/analytics.controller';

const router = Router();

router.get('/vehicles/top-global', getTopVehiclesGlobal);
router.get('/parking/:parkingId/vehicles/top', getTopVehiclesByParking);
router.get('/parking/:parkingId/vehicles/first-time', getFirstTimeParked);
router.get('/parking/:parkingId/earnings', getParkingEarnings);
router.get('/socios/top', getTopSocios);
router.get('/parkings/top', getTopParkings);

export default router;