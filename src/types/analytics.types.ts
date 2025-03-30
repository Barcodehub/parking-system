export interface TopVehicle {
    placa: string;
    count: number;
  }
  
  export interface TopSocio {
    socioId: number;
    socioName: string;
    vehicleCount: number;
    exitCount: number;
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