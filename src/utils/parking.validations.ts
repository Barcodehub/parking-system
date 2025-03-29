import { z } from 'zod';

export const createParkingSchema = z.object({
  nombre: z.string().min(3).max(100),
  capacidad: z.number().int().positive(),
  costoPorHora: z.number().positive(),
  socioId: z.number().int().positive()
});

export const updateParkingSchema = createParkingSchema.partial();