import {
    TopVehicle,
    TopSocio,
    TopParking,
    Earnings,
    FirstTimeParked
  } from '../types/analytics.types';
  import * as repository from '../repositories/analytics.repository';
  import { ForbiddenError, NotFoundError } from '../errors/appError';
import { prisma } from '../app';

export class AnalyticsService {
  async getTopVehiclesGlobal(): Promise<TopVehicle[]> {
    try {
      return await repository.getTopVehiclesGlobal();
    } catch (error) {
      console.error('Error in getTopVehiclesGlobal:', error);
      throw new Error('No se pudieron obtener las estadísticas globales del vehículo');
    }
  }

  async getTopVehiclesByParking(parkingId: number) {
    const parkingExists = await prisma.parking.findUnique({ 
      where: { id: parkingId } 
    });
    if (!parkingExists) {
      throw new NotFoundError('Parqueadero no encontrado'); // <-- Esto debe devolver 404
    }
    return await repository.getTopVehiclesByParking(parkingId);
  
  }

  async getFirstTimeParked(parkingId: number): Promise<FirstTimeParked[]> {
    const parkingExists = await prisma.parking.findUnique({
      where: { id: parkingId }
    });
    if (!parkingExists) {
      throw new NotFoundError('Parqueadero no encontrado');
    }
    return await repository.getFirstTimeParked(parkingId);
  }

  async getParkingEarnings(parkingId: number, socioId: number): Promise<Earnings> {
    // Verificar que el parqueadero exista y pertenezca al socio
    const parking = await prisma.parking.findUnique({
      where: { id: parkingId },
      select: { socioId: true }
    });

    if (!parking) {
      throw new NotFoundError('Parqueadero no encontrado');
    }

    if (parking.socioId !== socioId) {
      throw new ForbiddenError('No tienes permiso para acceder a este parqueadero');
    }

    return await repository.getParkingEarnings(parkingId);
}

  async getTopSocios(): Promise<TopSocio[]> {
    try {
      return await repository.getTopSocios();
    } catch (error) {
      console.error('Error in getTopSocios:', error);
      throw new Error('No se pudo cargar los top socios');
    }
  }

  async getTopParkings(): Promise<TopParking[]> {
    try {
      return await repository.getTopParkings();
    } catch (error) {
      console.error('Error in getTopParkings:', error);
      throw new Error('No se pudo cargar los top parqueaderos');
    }
  }
}