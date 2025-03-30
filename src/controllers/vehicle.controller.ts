import { Request, Response } from 'express';
import { VehicleService } from '../services/vehicle.service';
import { vehicleEntrySchema } from '../utils/vehicle.validations';

const vehicleService = new VehicleService();

export const registerEntry = async (req: Request, res: Response) => {
  const validatedData = vehicleEntrySchema.parse(req.body);
  const result = await vehicleService.registerEntry({
    ...validatedData,
    socioId: (req as any).user.id // ID del usuario autenticado
  });
  res.status(201).json(result);
};

export const registerExit = async (req: Request, res: Response) => {
  const validatedData = vehicleEntrySchema.parse(req.body);
  await vehicleService.registerExit({
    ...validatedData,
    socioId: (req as any).user.id // Ahora es válido
  });
  res.status(200).json({ mensaje: 'Salida registrada exitosamente' });
};

export const getVehiclesByParking = async (req: Request, res: Response) => {
  const parqueaderoId = parseInt(req.params.parqueaderoId);
  const vehicles = await vehicleService.getVehiclesByParking(parqueaderoId);
  res.json(vehicles);
};

