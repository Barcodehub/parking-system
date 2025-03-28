import app from './app';
import prisma from './config/database';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Verificar la conexión a la base de datos al iniciar
prisma.$connect()
  .then(() => {
    console.log('Connected to database');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error: any) => {
    console.error('Database connection error:', error);
    process.exit(1);
  });