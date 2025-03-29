import {
    TopVehicle,
    TopSocio,
    TopParking,
    Earnings,
    FirstTimeParked
  } from '../types/analytics.types';
  import * as repository from '../repositories/analytics.repository';
  
  export class AnalyticsService {
    async getTopVehiclesGlobal(): Promise<TopVehicle[]> {
      return await repository.getTopVehiclesGlobal();
    }
  
    async getTopVehiclesByParking(parkingId: number): Promise<TopVehicle[]> {
      return await repository.getTopVehiclesByParking(parkingId);
    }
  
    async getFirstTimeParked(parkingId: number): Promise<FirstTimeParked[]> {
      return await repository.getFirstTimeParked(parkingId);
    }
  
    async getParkingEarnings(parkingId: number): Promise<Earnings> {
      return await repository.getParkingEarnings(parkingId);
    }
  
    async getTopSocios(): Promise<TopSocio[]> {
      return await repository.getTopSocios();
    }
  
    async getTopParkings(): Promise<TopParking[]> {
      return await repository.getTopParkings();
    }
  }