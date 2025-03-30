import {
    CreateParkingDto,
    UpdateParkingDto
  } from '../types/parking.types';
  import * as repository from '../repositories/parking.repository';
import { prisma } from '../app';
import { Parking, Vehicle } from '@prisma/client';

import { NotFoundError, BadRequestError, ForbiddenError } from '../errors/appError';

export class ParkingService {
  async createParking(data: CreateParkingDto): Promise<any> {
    const socio = await prisma.user.findUnique({ 
      where: { id: data.socioId },
      select: { role: true } // Solo necesitamos verificar el rol
    });
    
    if (!socio) {
      throw new NotFoundError('Usuario no encontrado');
    }
    
    if (socio.role !== 'SOCIO') {
      throw new BadRequestError('El ID proporcionado no pertenece a un socio válido');
    }

    return await repository.createParking(data);
  }

  async getParking(id: number): Promise<any> {
    const parking = await repository.getParkingById(id);
    if (!parking) throw new NotFoundError('Parking not found');
    return parking;
  }

  async getAllParkings(): Promise<any[]> {
    return await repository.getAllParkings();
  }

  async updateParking(id: number, data: UpdateParkingDto): Promise<any> {
    await this.getParking(id); // Reutiliza la validación de existencia
    return await repository.updateParking(id, data);
  }

  async deleteParking(id: number): Promise<void> {
    await this.getParking(id); // Reutiliza la validación de existencia
    await repository.deleteParking(id);
  }

  async validateParkingCapacity(parkingId: number): Promise<void> {
    const { available } = await repository.checkParkingCapacity(parkingId);
    if (!available) {
      throw new BadRequestError('El parqueadero ha alcanzado su capacidad máxima');
    }
  }
  
  async getParkingCapacityInfo(parkingId: number): Promise<{
    available: boolean;
    current: number;
    capacity: number;
  }> {
    return await repository.checkParkingCapacity(parkingId);
  }

  async getParkingWithVehicles(id: number): Promise<any> {
    const parking = await repository.getParkingById(id);
    if (!parking) throw new NotFoundError('Parqueadero no encontrado');
    return parking;
  }

  async getParkingsBySocio(socioId: number): Promise<Parking[]> {
    return await prisma.parking.findMany({
      where: { socioId }
    });
  }

  async getSocioParkingVehicles(socioId: number, parkingId: number): Promise<Vehicle[]> {
    const parking = await prisma.parking.findFirst({
      where: {
        id: parkingId,
        socioId // q parking pertenece al socio
      }
    });
  
    // if (!parking) {
    //   throw new NotFoundError('Parqueadero no encontrado o no tienes permisos');
    // }
  
    return await prisma.vehicle.findMany({
      where: {
        parqueaderoId: parkingId,
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
  }
}


  