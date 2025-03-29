import { Router } from 'express';
import {
  createParking,
  getParking,
  getAllParkings,
  updateParking,
  deleteParking,
  checkCapacity,
  getParkingVehicles,
  getParkingsBySocio,
  getSocioParkingVehicles
} from '../controllers/parking.controller';
import { protect, isAdmin, isSocio } from '../middlewares/auth.middleware';
import { getVehiclesByParking } from '../controllers/vehicle.controller';
const router = Router();

router.post('/', protect, isAdmin, createParking);
router.get('/', protect, isAdmin, getAllParkings);
router.get('/:id', protect, isAdmin, getParking);
router.put('/:id', protect, isAdmin, updateParking);
router.delete('/:id', protect, isAdmin, deleteParking);
router.get('/:parkingId/capacity', protect, isAdmin, checkCapacity);
router.get('/:parkingId/vehicles', protect, isAdmin, getParkingVehicles);

router.get('/socio/:socioId', protect, isSocio, getParkingsBySocio);
router.get('/:parqueaderoId/vehicles', protect, isAdmin, getVehiclesByParking); 
router.get('/socio/:socioId/parking/:parqueaderoId/vehicles', protect, isSocio, getSocioParkingVehicles);

export default router;