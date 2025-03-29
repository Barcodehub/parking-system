import { Request, Response } from 'express';
import { VehicleService } from '../services/vehicle.service';
import { vehicleEntrySchema } from '../utils/vehicle.validations';
import { ZodError } from 'zod';

const vehicleService = new VehicleService();

export const registerEntry = async (req: Request, res: Response) => {
  try {
    // Validar datos de entrada
    const validatedData = vehicleEntrySchema.parse(req.body);
    
    // Registrar entrada
    const result = await vehicleService.registerEntry(validatedData);
    
    // Respuesta exitosa
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: 'Error de validación',
        details: error.errors
      });
    }

    if (typeof error === 'object' && error !== null && 'message' in error && 'code' in error) {
      const err = error as { message: string; code: number };
      return res.status(err.code).json({
        mensaje: err.message
      });
    }

    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
};





export const registerExit = async (req: Request, res: Response) => {
  try {
    // Validar datos de entrada (mismo schema que entrada)
    const validatedData = vehicleEntrySchema.parse(req.body);
    
    // Registrar salida
    await vehicleService.registerExit(validatedData);
    
    // Respuesta exitosa
    res.status(200).json({
      mensaje: 'Salida registrada'
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: 'Error de validación',
        details: error.errors
      });
    }

    if (typeof error === 'object' && error !== null && 'message' in error && 'code' in error) {
      const err = error as { message: string; code: number };
      return res.status(err.code).json({
        mensaje: err.message
      });
    }

    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
};