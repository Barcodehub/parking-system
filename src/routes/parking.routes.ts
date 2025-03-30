import { Router } from 'express';
import {
  createParking,
  getParking,
  getAllParkings,
  updateParking,
  deleteParking,
  checkCapacity,
  getParkingVehicles,
  getMyParkings,
  getMyParkingVehicles
} from '../controllers/parking.controller';
import { protect, isAdmin, isSocio } from '../middlewares/auth.middleware';
import { getVehiclesByParking } from '../controllers/vehicle.controller';

const router = Router();

router.get('/my-parkings', protect, isSocio, getMyParkings);
router.get('/my-parkings/:parkingId/vehicles', protect, isSocio, getMyParkingVehicles);
router.post('/', protect, isAdmin, createParking);
router.get('/', protect, isAdmin, getAllParkings);
router.get('/:id', protect, isAdmin, getParking);
router.put('/:id', protect, isAdmin, updateParking);
router.delete('/:id', protect, isAdmin, deleteParking);
router.get('/:parkingId/capacity', protect, isAdmin, checkCapacity);
router.get('/:parkingId/vehicles', protect, isAdmin, getParkingVehicles);
router.get('/:parqueaderoId/vehicles', protect, isAdmin, getVehiclesByParking); 




export default router;