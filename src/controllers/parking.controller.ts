import { Request, Response } from 'express';
import { ParkingService } from '../services/parking.service';
import { createParkingSchema, updateParkingSchema } from '../utils/parking.validations';

const parkingService = new ParkingService();


export const createParking = async (req: Request, res: Response) => {
  const validatedData = createParkingSchema.parse(req.body);
  const parking = await parkingService.createParking(validatedData);
  res.status(201).json(parking);
};

export const getParking = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const parking = await parkingService.getParking(id);
  res.json(parking);
};

export const getAllParkings = async (_req: Request, res: Response) => {
  const parkings = await parkingService.getAllParkings();
  res.json(parkings);
};

export const updateParking = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const validatedData = updateParkingSchema.parse(req.body);
  const parking = await parkingService.updateParking(id, validatedData);
  res.json(parking);
};

export const deleteParking = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await parkingService.deleteParking(id);
  res.status(204).send();
};

export const checkCapacity = async (req: Request, res: Response) => {
  const parkingId = parseInt(req.params.parkingId);
  const capacityInfo = await parkingService.getParkingCapacityInfo(parkingId);
  res.json(capacityInfo);
};

export const getParkingVehicles = async (req: Request, res: Response) => {
  const parkingId = parseInt(req.params.parkingId);
  const parking = await parkingService.getParkingWithVehicles(parkingId);
  res.json(parking.vehicles);
};

export const getMyParkings = async (req: Request, res: Response) => {
  const socioId = (req as any).user.id;
  const parkings = await parkingService.getParkingsBySocio(socioId);
  res.json(parkings);
};

export const getMyParkingVehicles = async (req: Request, res: Response) => {
  const socioId = (req as any).user.id;
  const parkingId = parseInt(req.params.parkingId);
  const vehicles = await parkingService.getSocioParkingVehicles(socioId, parkingId);
  res.json(vehicles);
};