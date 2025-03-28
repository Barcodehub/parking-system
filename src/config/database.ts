import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Función para asegurar que la base de datos existe (PostgreSQL compatible)
async function ensureDatabaseExists() {
  try {
    // PostgreSQL no tiene IF NOT EXISTS para CREATE DATABASE
    // Usamos una consulta alternativa para verificar y crear
    await prisma.$executeRaw`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'prisma_express_ts') THEN
          CREATE DATABASE prisma_express_ts;
        END IF;
      END
      $$;
    `;
    console.log('Database verified');
  } catch (error) {
    console.error('Error ensuring database exists:', error);
    throw error; // Relanzamos el error para manejo superior
  }
}

// Conexión y verificación
async function initializeDatabase() {
  try {
    await prisma.$connect();
    await ensureDatabaseExists();
    console.log('Connected to database');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
}

// Ejecutar la inicialización
initializeDatabase();

export default prisma;