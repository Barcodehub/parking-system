import {
    CreateParkingDto,
    UpdateParkingDto
  } from '../types/parking.types';
  import * as repository from '../repositories/parking.repository';
import { prisma } from '../app';
import { Parking, Vehicle } from '@prisma/client';


  
  export class ParkingService {
    async createParking(data: CreateParkingDto): Promise<any> {
      const socio = await prisma.user.findUnique({ where: { id: data.socioId } });
      
      if (!socio || socio.role !== 'SOCIO') {
        throw new Error('El ID proporcionado no pertenece a un socio válido');
      }
  
      return await repository.createParking(data);
    }
  
    async getParking(id: number): Promise<any> {
      const parking = await repository.getParkingById(id);
      if (!parking) throw new Error('Parking not found');
      return parking;
    }
  
    async getAllParkings(): Promise<any[]> {
      return await repository.getAllParkings();
    }
  
    async updateParking(id: number, data: UpdateParkingDto): Promise<any> {
      await this.getParking(id); // Verifica que exista
      return await repository.updateParking(id, data);
    }
  
    async deleteParking(id: number): Promise<void> {
      await this.getParking(id); // Verifica que exista
      await repository.deleteParking(id);
    }
  
    async validateParkingCapacity(parkingId: number): Promise<void> {
      const { available } = await repository.checkParkingCapacity(parkingId);
      if (!available) {
        throw new Error('El parqueadero ha alcanzado su capacidad máxima');
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
      if (!parking) throw new Error('Parqueadero no encontrado');
      return parking;
    }


    async getParkingsBySocio(socioId: number): Promise<Parking[]> {
      const socio = await prisma.user.findUnique({
        where: { id: socioId },
        select: { role: true }
      });
      
      if (!socio || socio.role !== 'SOCIO') {
        throw { message: 'El ID no pertenece a un socio válido', code: 404 };
      }
    
      return await repository.getParkingsBySocio(socioId);
    }




    async getSocioParkingVehicles(socioId: number, parqueaderoId: number): Promise<Vehicle[]> {
      // Verificar que el parqueadero pertenece al socio
      const parking = await prisma.parking.findFirst({
        where: {
          id: parqueaderoId,
          socioId
        }
      });
    
      if (!parking) {
        throw { 
          message: 'El parqueadero no existe o no pertenece al socio', 
          code: 404 
        };
      }
    
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
          parqueaderoId: true
        }
      });
    }




    
  }


  