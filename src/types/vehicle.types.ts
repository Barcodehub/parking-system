export interface VehicleEntryDto {
    placa: string;
    parqueaderoId: number;
    socioId: number;  
  }
  
  export interface VehicleExitDto {
    placa: string;
    parqueaderoId: number;
    socioId: number;  
  }

  export interface VehicleEntryResponse {
    id: number;
    correoEnviado: string;
  }