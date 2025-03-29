export interface CreateParkingDto {
    nombre: string;
    capacidad: number;
    costoPorHora: number;
    socioId: number;
  }
  
  export interface UpdateParkingDto extends Partial<CreateParkingDto> {}