export interface TopVehicle {
    placa: string;
    count: number;
  }
  
  export interface TopSocio {
    socioId: number;
    socioName: string;
    totalIngresos: number;  // Suma de vehículos en parking + salidos
    totalSalidas: number;   // Solo vehículos que ya salieron
  }
  
  export interface TopParking {
    parkingId: number;
    parkingName: string;
    total: number;
  }
  
  export interface Earnings {
    today: number;
    week: number;
    month: number;
    year: number;
  }
  
  export interface FirstTimeParked {
    placa: string;
    fechaIngreso: Date;
  }