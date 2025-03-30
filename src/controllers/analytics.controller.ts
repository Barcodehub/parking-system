import { Request, Response } from 'express';
import { AnalyticsService } from '../services/analytics.service';

const analyticsService = new AnalyticsService();

export const getTopVehiclesGlobal = async (_req: Request, res: Response) => {
  const result = await analyticsService.getTopVehiclesGlobal();
  res.json(result);
};

export const getTopVehiclesByParking = async (req: Request, res: Response) => {
  const parkingId = parseInt(req.params.parkingId);
  const result = await analyticsService.getTopVehiclesByParking(parkingId);
  res.json(result);
};

export const getFirstTimeParked = async (req: Request, res: Response) => {
  const parkingId = parseInt(req.params.parkingId);
  const result = await analyticsService.getFirstTimeParked(parkingId);
  res.json(result);
};

export const getParkingEarnings = async (req: Request, res: Response) => {
  const parkingId = parseInt(req.params.parkingId);
  const result = await analyticsService.getParkingEarnings(parkingId);
  res.json(result);
};

export const getTopSocios = async (_req: Request, res: Response) => {
  const result = await analyticsService.getTopSocios();
  res.json(result);
};

export const getTopParkings = async (_req: Request, res: Response) => {
  const result = await analyticsService.getTopParkings();
  res.json(result);
};