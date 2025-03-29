import { PrismaClient, Parking, Vehicle } from '@prisma/client';
import { CreateParkingDto, UpdateParkingDto } from '../types/parking.types';

const prisma = new PrismaClient();

export const createParking = async (data: CreateParkingDto): Promise<Parking> => {
  return await prisma.parking.create({ data });
};

export const getParkingById = async (id: number): Promise<(Parking & { vehicles: Vehicle[] }) | null> => {
  return await prisma.parking.findUnique({ 
    where: { id },
    include: { 
      socio: true,
      vehicles: {
        where: {
          fechaSalida: null // Solo vehículos activos
        }
      }
    }
  });
};

export const getAllParkings = async (): Promise<(Parking & { vehicles: Vehicle[] })[]> => {
  return await prisma.parking.findMany({ 
    include: { 
      socio: true,
      vehicles: {
        where: {
          fechaSalida: null
        }
      }
    } 
  });
};

export const updateParking = async (id: number, data: UpdateParkingDto): Promise<Parking> => {
  return await prisma.parking.update({
    where: { id },
    data
  });
};

export const deleteParking = async (id: number): Promise<Parking> => {
  return await prisma.parking.delete({ where: { id } });
};

export const checkParkingCapacity = async (parkingId: number): Promise<{ available: boolean, current: number, capacity: number }> => {
  const parking = await prisma.parking.findUnique({
    where: { id: parkingId },
    include: {
      vehicles: {
        where: {
          fechaSalida: null
        }
      }
    }
  });

  if (!parking) {
    throw new Error('Parqueadero no encontrado');
  }

  return {
    available: parking.vehicles.length < parking.capacidad,
    current: parking.vehicles.length,
    capacity: parking.capacidad
  };
};