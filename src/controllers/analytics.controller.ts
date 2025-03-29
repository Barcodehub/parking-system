import { Request, Response } from 'express';
import { AnalyticsService } from '../services/analytics.service';

const analyticsService = new AnalyticsService();

export const getTopVehiclesGlobal = async (_req: Request, res: Response) => {
  try {
    const result = await analyticsService.getTopVehiclesGlobal();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTopVehiclesByParking = async (req: Request, res: Response) => {
  try {
    const parkingId = parseInt(req.params.parkingId);
    const result = await analyticsService.getTopVehiclesByParking(parkingId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getFirstTimeParked = async (req: Request, res: Response) => {
  try {
    const parkingId = parseInt(req.params.parkingId);
    const result = await analyticsService.getFirstTimeParked(parkingId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getParkingEarnings = async (req: Request, res: Response) => {
  try {
    const parkingId = parseInt(req.params.parkingId);
    const result = await analyticsService.getParkingEarnings(parkingId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTopSocios = async (_req: Request, res: Response) => {
  try {
    const result = await analyticsService.getTopSocios();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTopParkings = async (_req: Request, res: Response) => {
  try {
    const result = await analyticsService.getTopParkings();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};