import { z } from 'zod';

export const vehicleEntrySchema = z.object({
  placa: z.string()
    .length(6, 'La placa debe tener exactamente 6 caracteres')
    .regex(/^[A-Z0-9]+$/i, 'La placa solo puede contener letras y números (sin ñ ni caracteres especiales)'),
  parqueaderoId: z.number().int().positive()
});