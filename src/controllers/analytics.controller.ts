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
  const socioId = (req as any).user.id; // ID del socio autenticado
  
  const result = await analyticsService.getParkingEarnings(parkingId, socioId);
  res.json(result);
};

export const getTopSocios = async (_req: Request, res: Response) => {
  try {
    const result = await analyticsService.getTopSocios();
    
    if (!result) {
      return res.status(404).json({ error: 'No se encontraron datos' });
    }

    res.json(result);
  } catch (error) {
    console.error('Error en getTopSocios:', error);
    res.status(500).json({ error: 'Error al obtener los top socios' });
  }
};

export const getTopParkings = async (_req: Request, res: Response) => {
  const result = await analyticsService.getTopParkings();
  res.json(result);
};