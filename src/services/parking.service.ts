import {
    CreateParkingDto,
    UpdateParkingDto
  } from '../types/parking.types';
  import * as repository from '../repositories/parking.repository';
import { prisma } from '../app';


  
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
  }