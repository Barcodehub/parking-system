import { PrismaClient, Vehicle, VehicleHistory } from '@prisma/client';

const prisma = new PrismaClient();

export const findActiveVehicleByPlaca = async (placa: string): Promise<Vehicle | null> => {
  return await prisma.vehicle.findFirst({
    where: {
      placa
    }
  });
};

export const registerVehicleEntry = async (data: { 
  placa: string, 
  parqueaderoId: number,
  socioId: number // Ahora se provee automáticamente
}): Promise<Vehicle> => {
  return await prisma.vehicle.create({
    data: {
      placa: data.placa.toUpperCase(),
      parqueaderoId: data.parqueaderoId,
      socioId: data.socioId, // Recibido del servicio
      fechaIngreso: new Date()
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
    // 1. Obtener el vehículo activo y la tarifa del parqueadero
    const vehicleWithParking = await tx.vehicle.findFirst({
      where: {
        placa,
        parqueaderoId,
        fechaSalida: null
      },
      include: {
        parqueadero: {
          select: {
            costoPorHora: true
          }
        }
      }
    });

    if (!vehicleWithParking) throw new Error('Vehículo no encontrado');

    // 2. Calcular el costo
    const now = new Date();
    const horasEstancia = (now.getTime() - vehicleWithParking.fechaIngreso.getTime()) / (1000 * 60 * 60);
    const costo = horasEstancia * vehicleWithParking.parqueadero.costoPorHora.toNumber();

    // 3. Crear registro en el historial con el costo calculado
    await tx.vehicleHistory.create({
      data: {
        placa: vehicleWithParking.placa,
        fechaIngreso: vehicleWithParking.fechaIngreso,
        fechaSalida: now,
        parqueaderoId,
        costo
      }
    });

   // 4. ACTUALIZAR el vehículo en lugar de eliminarlo (cambio clave)
   await tx.vehicle.update({
    where: { id: vehicleWithParking.id },
    data: {
      fechaSalida: now
    }
  });
});
};





export const getActiveVehiclesByParking = async (parqueaderoId: number): Promise<Vehicle[]> => {
  return await prisma.vehicle.findMany({
    where: {
      parqueaderoId,
      fechaSalida: null
    },
    select: {
      id: true,
      placa: true,
      fechaIngreso: true,
      fechaSalida: true,
      parqueaderoId: true,
      socioId: true 
    }
  });
};