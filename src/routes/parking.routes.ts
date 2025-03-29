import { Router } from 'express';
import {
  createParking,
  getParking,
  getAllParkings,
  updateParking,
  deleteParking,
  checkCapacity,
  getParkingVehicles
} from '../controllers/parking.controller';
import { protect, isAdmin } from '../middlewares/auth.middleware';
const router = Router();

router.post('/', protect, isAdmin, createParking);
router.get('/', protect, isAdmin, getAllParkings);
router.get('/:id', protect, isAdmin, getParking);
router.put('/:id', protect, isAdmin, updateParking);
router.delete('/:id', protect, isAdmin, deleteParking);
router.get('/:parkingId/capacity', protect, isAdmin, checkCapacity);
router.get('/:parkingId/vehicles', protect, isAdmin, getParkingVehicles);

export default router;