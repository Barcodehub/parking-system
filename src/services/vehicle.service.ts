import { VehicleEntryDto, VehicleEntryResponse } from '../types/vehicle.types';
import * as repository from '../repositories/vehicle.repository';
import { ParkingService } from '../services/parking.service';

const parkingService = new ParkingService();

export class VehicleService {
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
    await parkingService.validateParkingCapacity(data.parqueaderoId);

    // 4. Registrar entrada
    const vehicle = await repository.registerVehicleEntry(data);
    
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

}