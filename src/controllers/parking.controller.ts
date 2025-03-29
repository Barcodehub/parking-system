import { Request, Response } from 'express';
import { ParkingService } from '../services/parking.service';
import { createParkingSchema, updateParkingSchema } from '../utils/parking.validations';
import { ZodError } from 'zod';

const parkingService = new ParkingService();


export const createParking = async (req: Request, res: Response) => {
  try {
    const validatedData = createParkingSchema.parse(req.body);
    const parking = await parkingService.createParking(validatedData);
    res.status(201).json(parking);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      const errMessage = error instanceof Error ? error.message : "Unknown error";
      res.status(400).json({ message: errMessage });
    }
  }
};

export const getParking = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const parking = await parkingService.getParking(id);
    res.json(parking);
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ message: errMessage });
  }
};

export const getAllParkings = async (_req: Request, res: Response) => {
  try {
    const parkings = await parkingService.getAllParkings();
    res.json(parkings);
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ message: errMessage });
  }
};

export const updateParking = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const validatedData = updateParkingSchema.parse(req.body);
    const parking = await parkingService.updateParking(id, validatedData);
    res.json(parking);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      const errMessage = error instanceof Error ? error.message : "Unknown error";
      res.status(400).json({ message: errMessage });
    }
  }
};

export const deleteParking = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await parkingService.deleteParking(id);
    res.status(204).send();
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ message: errMessage });
  }
};

export const checkCapacity = async (req: Request, res: Response) => {
  try {
    const parkingId = parseInt(req.params.parkingId);
    const capacityInfo = await parkingService.getParkingCapacityInfo(parkingId);
    res.json(capacityInfo);
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ message: errMessage });
  }
};

// Obtener vehículos en un parqueadero
export const getParkingVehicles = async (req: Request, res: Response) => {
  try {
    const parkingId = parseInt(req.params.parkingId);
    const parking = await parkingService.getParkingWithVehicles(parkingId);
    res.json(parking.vehicles);
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ message: errMessage });
  }
};


export const getParkingsBySocio = async (req: Request, res: Response) => {
  try {
    const socioId = parseInt(req.params.socioId);
    const parkings = await parkingService.getParkingsBySocio(socioId);
    res.json(parkings);
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ message: errMessage });
  }
};


export const getSocioParkingVehicles = async (req: Request, res: Response) => {
  try {
    const socioId = parseInt(req.params.socioId);
    const parqueaderoId = parseInt(req.params.parqueaderoId);
    const vehicles = await parkingService.getSocioParkingVehicles(socioId, parqueaderoId);
    res.json(vehicles);
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ message: errMessage });
  }
};