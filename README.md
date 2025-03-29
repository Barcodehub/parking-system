# Parking Management API

## Descripción:
API para gestión de parqueaderos con autenticación de usuarios, registro de vehículos y análisis de datos. Desarrollada con Express, TypeScript y Prisma.

## Características principales:
- Control de vehículos en parqueaderos de múltiples socios
- Histórico completo de vehículos parqueados (VehicleHistory)
- Sistema de roles (ADMIN/SOCIO) con permisos diferenciados
- Microservicio de email simulado

## ROLES Y PERMISOS:

### Admin puede:

 - [x] CRUD completo de parqueaderos.
 - [x] Asignar parqueaderos a socios.
 - [x] Ver listado/detalle de vehículos en cualquier parqueadero.
 - [x] Simular envío de emails a socios.
 - [x] Acceder a todos los indicadores.

### Socio puede:

 - [x] Registrar entrada/salida de vehículos en sus parqueaderos.
 - [x] Ver sus parqueaderos asociados.
 - [x] Ver vehículos en sus parqueaderos.
 - [x] Acceder a indicadores de sus parqueaderos.

## Instalación:

1. Requisitos previos:
   - Node.js 18+ instalado
   - PostgreSQL 14+ corriendo

2. Configuración inicial:
   - git clone [https://github.com/Barcodehub/parking-system](https://github.com/Barcodehub/parking-system)
   - cd parking-system
   - `npm install`

3. Configuración de entorno:
   Crear archivo `.env` en la raíz con:

   - DATABASE_URL=`postgresql://user:password@localhost:5432/parkingdb?schema=public`
   - PORT=`3000`
   - JWT_SECRET=`tu_secreto_jwt`
   - EMAIL_SERVICE_URL=`http://localhost:3001/email/send`

5. Base de datos:
   - `npx prisma migrate dev --name init`
   - `npx prisma generate`
  
6. Run
   - `npm run dev`

7. Run microservice "api-email", abre otra terminal y escribe:
   - cd api-email
   - `npm run dev`

## Estructura de directorios:
  ```

  ├── api-email/        #microservice email-simulacion
  │ 
  prisma/               # Configuración de Prisma
  │   ├── schema.prisma # Modelos de DB
  │   └── migrations/   # Migraciones
  │
  src/
  ├── config/           # Configuraciones 
  │   └── env.ts      #Variables de entorno (typado)
  │   └── seed.ts  # Admin precargado
  │
  ├── controllers/      # Lógica de endpoints HTTP
  │   ├── analytics.controller.ts
  │   ├── auth.controller.ts
  │   ├── parking.controller.ts
  │   └── vehicle.controller.ts
  │
  ├── middlewares/      # Middlewares de Express
  │   ├── auth.middleware.ts       # Autenticación
  │
  ├── repositories/     # Acceso a datos (Prisma)
  │   ├── analytics.repository.ts
  │   ├── auth.repository.ts
  │   ├── parking.repository.ts
  │   └── vehicle.repository.ts
  │
  ├── routes/           # Definición de rutas
  │   ├── analytics. routes.ts
  │   ├── auth. routes.ts
  │   ├── parking. routes.ts
  │   └── vehicle. routes.ts
  │   └── index.ts      # Consolidación de rutas
  │
  ├── services/         # Lógica de negocio
  │   ├── analytics.services.ts
  │   ├── auth.services.ts
  │   ├── parking.services.ts
  │   └── vehicle.services.ts
  │
  ├── types/            # Tipos TS
  │   ├── analytics.types.ts
  │   ├── auth.types.ts
  │   ├── parking.types.ts
  │   └── vehicle.types.ts
  │
  ├── utils/            # Utilidades
  │   ├── parking.validations.ts # Validación de datos
  │   └── vehicle.validations.ts 
  │
  ├── app.ts            # Configuración de Express
  └── server.ts         # Inicio del servidor
  │
  .env                  # Variables de entorno
  ```

## Endpoints principales:

  ### Autenticación:
  - POST `/auth/register` - Registro de socios
  - POST `/auth/login` - Login de usuarios
  
  ### Parqueaderos:
  - GET `/parkings` - Listar todos
  - POST `/parkings` - Crear nuevo
  - GET `/parkings/:id` - Obtener por ID
  - GET `/parkings/socio/:socioId` - Parqueaderos de un socio
  
  ### Vehículos:
  - POST `/vehicles/entry` - Registrar entrada
  - POST `/vehicles/exit` - Registrar salida
  
  ## Analíticas:
  - GET `/analytics/vehicles/top-global` - Top 10 vehículos
  - GET `/analytics/parking/:id/earnings` - Ganancias por periodos
  - GET `/analytics/socios/top` - Top 3 socios
  - GET `/analytics/parkings/top` - Top 3 parqueaderos


