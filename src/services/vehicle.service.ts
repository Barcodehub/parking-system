import { VehicleEntryDto, VehicleEntryResponse } from '../types/vehicle.types';
import * as repository from '../repositories/vehicle.repository';
import { ParkingService } from '../services/parking.service';
import { Vehicle } from '@prisma/client';
import { prisma } from '../app';
import axios from 'axios';
import { BadRequestError, NotFoundError } from '../errors/appError';

const parkingService = new ParkingService();


export class VehicleService {
  private emailServiceUrl = 'http://localhost:3001/email/send';
  async registerEntry(data: VehicleEntryDto): Promise<VehicleEntryResponse> {
    return await prisma.$transaction(async (tx) => {
      // 1. Validar formato de placa
      if (!repository.validatePlacaFormat(data.placa)) {
        throw new BadRequestError('Formato de placa inválido');
      }
  
      // 2. Verificar vehículo existente ACTIVO (usando la transacción)
      const existingActiveVehicle = await tx.vehicle.findFirst({
        where: {
          placa: data.placa.toLocaleUpperCase(),
          fechaSalida: null // Solo verifica vehículos sin fecha de salida
        }
      });
  
      if (existingActiveVehicle) {
        throw new BadRequestError('Esta placa ya tiene un registro activo en el sistema');
      }
  
      // 3. Obtener parqueadero con socioId (usando la transacción)
      const parking = await tx.parking.findUnique({
        where: { id: data.parqueaderoId },
        select: { 
          socioId: true,
          capacidad: true,
          _count: { 
            select: { 
              vehicles: { 
                where: { fechaSalida: null } 
              } 
            } 
          } 
        }
      });
  
      if (!parking) {
        throw new BadRequestError('Parqueadero no existe');
      }
  
      // 4. Validar capacidad
      if (parking._count.vehicles >= parking.capacidad) {
        throw new BadRequestError('Parqueadero lleno');
      }
  
      // 5. Registrar entrada (usando la transacción)
      try {
        const vehicle = await tx.vehicle.create({
          data: {
            placa: data.placa.toLocaleUpperCase(),
            parqueaderoId: data.parqueaderoId,
            socioId: data.socioId 
          }
        });
  
        // 6. Enviar notificación por email (fuera de la transacción)
        let emailSent = false;
        try {
          const parkingWithEmail = await tx.parking.findUnique({
            where: { id: data.parqueaderoId },
            select: { nombre: true, socio: { select: { email: true } } }
          });
  
          if (parkingWithEmail) {
            await axios.post(this.emailServiceUrl, {
              email: parkingWithEmail.socio.email,
              placa: data.placa,
              mensaje: `Nuevo vehículo registrado en ${parkingWithEmail.nombre}`,
              parqueaderoId: data.parqueaderoId
            });
            emailSent = true;
          }
        } catch (error) {
          console.warn('Error enviando email:', error);
        }
  
        return { 
          id: vehicle.id,
          correoEnviado: emailSent ? "Correo enviado" : "Correo no enviado"
        };
      } catch (error) {
        // Manejo adicional de errores por si acaso
        if (error instanceof Error && "code" in error && (error as any).code === 'P2002') {
          throw new BadRequestError('Esta placa ya existe en el sistema (incluso en registros históricos)');
        }
        throw error;
      }
    });
  }













  async registerExit(data: { placa: string; parqueaderoId: number }): Promise<void> {
    // 1. Validar formato de placa
    if (!repository.validatePlacaFormat(data.placa)) {
      throw new BadRequestError('Formato de placa inválido');
    }

    // 2. Verificar que el vehículo está activo en este parqueadero
    const activeVehicle = await repository.findActiveVehicle(data.placa.toLocaleUpperCase(), data.parqueaderoId);
    if (!activeVehicle) {
      throw new NotFoundError('No se puede Registrar Salida, no existe la placa en el parqueadero');
    }

    // 3. Registrar salida y mover al historial
    await repository.registerVehicleExit(data.placa.toLocaleUpperCase(), data.parqueaderoId);
  }

  async getVehiclesByParking(parqueaderoId: number): Promise<Vehicle[]> {
    const vehicles = await repository.getActiveVehiclesByParking(parqueaderoId);
    if (!vehicles || vehicles.length === 0) {
      throw new NotFoundError('No se encontraron vehículos en este parqueadero');
    }
    return vehicles;
  }
}