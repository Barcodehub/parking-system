import { PrismaClient, Vehicle, VehicleHistory } from '@prisma/client';

const prisma = new PrismaClient();

export const findActiveVehicleByPlaca = async (placa: string): Promise<Vehicle | null> => {
  return await prisma.vehicle.findFirst({
    where: {
      placa,
      fechaSalida: null
    }
  });
};

export const registerVehicleEntry = async (data: { placa: string, parqueaderoId: number }): Promise<Vehicle> => {
  return await prisma.vehicle.create({
    data: {
      placa: data.placa.toUpperCase(), // Guardamos en mayúsculas
      parqueaderoId: data.parqueaderoId,
      fechaIngreso: new Date() // Fecha automática
    }
  });
};

export const validatePlacaFormat = (placa: string): boolean => {
  const placaRegex = /^[A-Z0-9]{6}$/i;
  return placaRegex.test(placa) && !placa.includes('Ñ') && !placa.includes('ñ');
};




export const findActiveVehicle = async (placa: string, parqueaderoId: number): Promise<Vehicle | null> => {
  return await prisma.vehicle.findFirst({
    where: {
      placa,
      parqueaderoId,
      fechaSalida: null
    }
  });
};

export const registerVehicleExit = async (placa: string, parqueaderoId: number): Promise<void> => {
  await prisma.$transaction(async (tx) => {
    // 1. Obtener el vehículo activo
    const vehicle = await tx.vehicle.findFirst({
      where: {
        placa,
        parqueaderoId,
        fechaSalida: null
      }
    });

    if (!vehicle) throw new Error('Vehículo no encontrado');

    // 2. Crear registro en el historial
    await tx.vehicleHistory.create({
      data: {
        placa: vehicle.placa,
        fechaIngreso: vehicle.fechaIngreso,
        fechaSalida: new Date(), // Fecha-hora automática
        parqueaderoId: vehicle.parqueaderoId
      }
    });

    // 3. Eliminar de la tabla de vehículos activos
    await tx.vehicle.delete({
      where: { id: vehicle.id }
    });
  });
};