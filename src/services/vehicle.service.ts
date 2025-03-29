import { VehicleEntryDto, VehicleEntryResponse } from '../types/vehicle.types';
import * as repository from '../repositories/vehicle.repository';
import { ParkingService } from '../services/parking.service';
import { Vehicle } from '@prisma/client';
import { prisma } from '../app';
import axios from 'axios';

const parkingService = new ParkingService();

export class VehicleService {
  private emailServiceUrl = process.env.EMAIL_SERVICE_URL || 'http://localhost:3001/email/send';

  async registerEntry(data: VehicleEntryDto): Promise<VehicleEntryResponse> {
    // 1. Validar formato de placa
    if (!repository.validatePlacaFormat(data.placa)) {
      throw {
        message: 'Formato de placa inválido',
        code: 400
      };
    }

    // 2. Verificar si ya existe un vehículo activo con esta placa
    const existingVehicle = await repository.findActiveVehicleByPlaca(data.placa);
    if (existingVehicle) {
      throw {
        message: 'No se puede Registrar Ingreso, ya existe la placa en este u otro parqueadero',
        code: 400
      };
    }

    // 3. Verificar capacidad del parqueadero
    try {
      await parkingService.validateParkingCapacity(data.parqueaderoId);
    } catch (error) {
      throw {
        message: 'No se puede registrar ingreso: Parqueadero lleno',
        code: 400
      };
    }

    // 4. Registrar entrada
    const vehicle = await repository.registerVehicleEntry(data);
    
    // Obtener info del parqueadero para el email
    const parking = await prisma.parking.findUnique({
      where: { id: data.parqueaderoId },
      select: { nombre: true, socio: { select: { email: true } } }
    });

    if (parking) {
      try {
        await axios.post(this.emailServiceUrl, {
          email: parking.socio.email,
          placa: data.placa,
          mensaje: `Nuevo vehículo registrado en ${parking.nombre}`,
          parqueaderoId: parking.nombre
        });
      } catch (error) {
        console.warn('No se pudo enviar el email. El servicio de email puede estar caído.');
        // mm pa noo se dañe la operación principal si el email falla
      }
    }

    return { id: vehicle.id };
  }




  async registerExit(data: { placa: string; parqueaderoId: number }): Promise<void> {
    // 1. Validar formato de placa
    if (!repository.validatePlacaFormat(data.placa)) {
      throw {
        message: 'Formato de placa inválido',
        code: 400
      };
    }

    // 2. Verificar que el vehículo está activo en este parqueadero
    const activeVehicle = await repository.findActiveVehicle(data.placa, data.parqueaderoId);
    if (!activeVehicle) {
      throw {
        message: 'No se puede Registrar Salida, no existe la placa en el parqueadero',
        code: 400
      };
    }

    // 3. Registrar salida y mover al historial
    await repository.registerVehicleExit(data.placa, data.parqueaderoId);
  }




  async getVehiclesByParking(parqueaderoId: number): Promise<Vehicle[]> {
    return await repository.getActiveVehiclesByParking(parqueaderoId);
  }

}