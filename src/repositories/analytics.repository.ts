import { Earnings, FirstTimeParked, TopParking, TopSocio, TopVehicle } from '@/types/analytics.types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTopVehiclesGlobal = async (): Promise<TopVehicle[]> => {
  return await prisma.vehicleHistory.groupBy({
    by: ['placa'],
    _count: { placa: true },
    orderBy: { _count: { placa: 'desc' } },
    take: 10
  }).then(results => 
    results.map(r => ({ placa: r.placa, count: r._count.placa }))
)};

export const getTopVehiclesByParking = async (parkingId: number): Promise<TopVehicle[]> => {
  return await prisma.vehicleHistory.groupBy({
    by: ['placa'],
    where: { parqueaderoId: parkingId },
    _count: { placa: true },
    orderBy: { _count: { placa: 'desc' } },
    take: 10
  }).then(results => 
    results.map(r => ({ placa: r.placa, count: r._count.placa }))
)};

export const getFirstTimeParked = async (parkingId: number): Promise<FirstTimeParked[]> => {
  try {
    return await prisma.$queryRaw<FirstTimeParked[]>`
      SELECT 
        v.placa,
        v."fechaIngreso"
      FROM "vehicles" v
      WHERE v."parqueaderoId" = ${parkingId}
      AND v."fechaSalida" IS NULL
      AND NOT EXISTS (
        SELECT 1 FROM "vehicle_history" vh 
        WHERE vh."placa" = v."placa"
        AND vh."parqueaderoId" = ${parkingId}
      )
    `;
  } catch (error) {
    console.error('Error en getFirstTimeParked (raw query):', error);
    throw new Error('Error al obtener vehículos por primera vez');
  }
};

export const getParkingEarnings = async (parkingId: number): Promise<Earnings> => {
  const now = new Date();
  const dayStart = new Date(now.setHours(0, 0, 0, 0));
  const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const yearStart = new Date(now.getFullYear(), 0, 1);

  const [today, week, month, year] = await Promise.all([
    calculateEarnings(parkingId, dayStart, new Date()),
    calculateEarnings(parkingId, weekStart, new Date()),
    calculateEarnings(parkingId, monthStart, new Date()),
    calculateEarnings(parkingId, yearStart, new Date())
  ]);

  return { today, week, month, year };
};

const calculateEarnings = async (parkingId: number, from: Date, to: Date): Promise<number> => {
  const result = await prisma.vehicleHistory.aggregate({
    where: {
      parqueaderoId: parkingId,
      fechaSalida: { gte: from, lte: to }
    },
    _sum: { costo: true }
  });
  return result._sum.costo?.toNumber() || 0;
};

export const getTopSocios = async (): Promise<TopSocio[]> => {
  try {
    const result = await prisma.$queryRaw<TopSocio[]>`
      SELECT 
        p."socioId" as "socioId", 
        u."name" as "socioName",
        COUNT(vh.id)::integer as "count",
        COALESCE(SUM(vh."costo"), 0)::decimal as "total"
      FROM "vehicle_history" vh
      JOIN "parkings" p ON vh."parqueaderoId" = p.id
      JOIN "users" u ON p."socioId" = u.id
      WHERE vh."fechaSalida" >= DATE_TRUNC('week', CURRENT_DATE)
        AND vh."costo" > 0
      GROUP BY p."socioId", u."name"
      ORDER BY "total" DESC
      LIMIT 3
    `;
    return result.map(item => ({
      ...item,
      total: parseFloat(item.total.toString()) // Convertir Decimal a número
    }));
  } catch (error) {
    console.error('Error en getTopSocios:', error);
    throw new Error('Error al obtener los top socios');
  }
};

export const getTopParkings = async (): Promise<TopParking[]> => {
  try {
    const result = await prisma.$queryRaw<TopParking[]>`
      SELECT 
        vh."parqueaderoId" as "parkingId",
        p."nombre" as "parkingName",
        COALESCE(SUM(vh."costo"), 0)::float as "total"
      FROM "vehicle_history" vh
      JOIN "parkings" p ON vh."parqueaderoId" = p."id"
      WHERE vh."fechaSalida" >= DATE_TRUNC('week', CURRENT_DATE)
      GROUP BY vh."parqueaderoId", p."nombre"
      ORDER BY "total" DESC
      LIMIT 3  -- 3 registros top 3 osea
    `;
    return result;
  } catch (error) {
    console.error('Error en getTopParkings:', error);
    throw new Error('Error al obtener el top 3 de parqueaderos');
  }
};