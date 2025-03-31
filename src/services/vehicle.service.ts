import { VehicleEntryDto, VehicleEntryResponse, VehicleExitDto } from '../types/vehicle.types';
import * as repository from '../repositories/vehicle.repository';
import { ParkingService } from '../services/parking.service';
import { Vehicle } from '@prisma/client';
import { prisma } from '../app';
import axios from 'axios';
import { BadRequestError, NotFoundError } from '../errors/appError';
import { EMAIL_SERVICE_URL } from '../config/env';

const parkingService = new ParkingService();


export class VehicleService {
  private emailServiceUrl = EMAIL_SERVICE_URL ;


  
  async registerEntry(data: VehicleEntryDto): Promise<VehicleEntryResponse> {
    // 1. Validar formato de placa
    if (!repository.validatePlacaFormat(data.placa)) {
      throw new BadRequestError('Formato de placa inválido');
    }

    // 2. Verificar si ya existe un vehículo activo con esta placa
    const existingVehicle = await repository.findActiveVehicleByPlaca(data.placa);
    if (existingVehicle) {
      throw new BadRequestError('No se puede Registrar Ingreso, ya existe la placa en este u otro parqueadero');
    }

    const parkingExists = await prisma.parking.findUnique({
      where: { id: data.parqueaderoId },
    });
    
    if (!parkingExists) {
      throw new BadRequestError('El parqueadero no existe');
    }
    // 3. Verificar capacidad del parqueadero
    try {
      await parkingService.validateParkingCapacity(data.parqueaderoId);
    } catch (error) {
      throw new BadRequestError('No se puede registrar ingreso: Parqueadero lleno');
    }

    // 4. Registrar entrada
    const vehicle = await repository.registerVehicleEntry(data);
    
    // 5. Enviar notificación por email 
    let emailSent = false;
    const parking = await prisma.parking.findUnique({
      where: { id: data.parqueaderoId },
      select: { id: true, nombre: true, socio: { select: { email: true } } }
    });

    if (parking) {
      try {
        await axios.post(this.emailServiceUrl, {
          email: parking.socio.email,
          placa: data.placa,
          mensaje: `Nuevo vehículo registrado en ${parking.nombre}`,
          parqueaderoId: parking.id
        });
        emailSent = true;
      } catch (error) {
        console.warn('No se pudo enviar el email. El servicio de email puede estar caído.');
      }
    }

    return { 
      id: vehicle.id,
      mensaje: emailSent ? "Correo enviado" : "Correo no enviado"
    };
  }




  async registerExit(data: VehicleExitDto): Promise<void> {
    // 1. Validar formato de placa
    if (!repository.validatePlacaFormat(data.placa)) {
      throw new BadRequestError('Formato de placa inválido');
    }

    //1.1 si existe el parking
    const parkingExists = await prisma.parking.findUnique({
      where: { id: data.parqueaderoId },
    });
    
    if (!parkingExists) {
      throw new BadRequestError('El parqueadero no existe');
    }

    // 2. Verificar que el vehículo está activo en este parqueadero
    const activeVehicle = await repository.findActiveVehicle(data.placa, data.parqueaderoId);
    if (!activeVehicle) {
      throw new NotFoundError('No se puede Registrar Salida, no existe la placa en el parqueadero');
    }

    // 3. Registrar salida y mover al historial
    await repository.registerVehicleExit(data.socioId, data.placa, data.parqueaderoId);
  }




  async getVehiclesByParking(parqueaderoId: number): Promise<Vehicle[]> {
    const vehicles = await repository.getActiveVehiclesByParking(parqueaderoId);
    if (!vehicles || vehicles.length === 0) {
      throw new NotFoundError('No se encontraron vehículos en este parqueadero');
    }
    return vehicles;
  }
}