# Parking Management API

## Índice
1. [Descripción](#descripción)
2. [Características principales](#características-principales)
3. [Roles y Permisos](#roles-y-permisos)
   - [Admin](#admin-puede)
   - [Socio](#socio-puede)
4. [Instalación](#instalación)
   - [Requisitos previos](#1-requisitos-previos:)
   - [Configuración inicial](#2-configuración-inicial)
   - [Configuración de entorno](#3-configuración-de-entorno)
   - [Base de datos](#5-base-de-datos)
   - [Ejecución](#6-run)
   - [Microservicio Email](#7-run-microservice-api-email)
5. [Estructura de directorios](#estructura-de-directorios)
6. [Endpoints del Sistema](#endpoints-del-sistema)
   - [Autenticación](#AUTHENTICACIÓN)
   - [Analíticas](#Analitycs)
   - [Vehículos](#vehículos)
   - [Parqueaderos](#parqueaderos)
   - [Email (Simulación)](#email-simulación)


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
   - Node.js 18+, npm, instalados
   - PostgreSQL 14+ corriendo

2. Configuración inicial:
   - git clone [https://github.com/Barcodehub/parking-system](https://github.com/Barcodehub/parking-system)
   - cd parking-system
   - `npm install`

3. Configuración de entorno:
   Crear archivo `.env` en la raíz con:

   - DATABASE_URL=`postgresql://user:password@localhost:<Your_PORT_Postgres>/parkingdb?schema=public`
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
   - `npm install`
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
  ├── errors/
  │   ├── appError.ts
  │
  ├── middlewares/               # Middlewares 
  │   ├── auth.middleware.ts           # Autenticación   
  │   ├── errorHandler.middleware.ts   #Manejo de errores
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

## ENDPOINTS DEL SISTEMA

### AUTHENTICACIÓN

```http
POST /auth/login
Descripción: Iniciar sesión (guarda token automáticamente)
Body: {"email": "string", "password": "string"}
Permisos: Público
```
```http
POST /auth/socio
Descripción: Registra un nuevo socio (solo admin)
Headers: Authorization: Bearer {token}
Body: {"name": "Nombre", "email": "email@valido.com", "password": "contraseña"}
Permisos: Admin
```
```http
POST /auth/logout
Descripción: Cierra la sesión actual
Headers: Authorization: Bearer {token}
Permisos: Cualquier usuario autenticado
```

### Analitycs
```http
GET /analytics/vehicles/top-global
Descripción: Top 10 vehículos más registrados en todos los parqueaderos
Headers: Authorization: Bearer {token}
Permisos: Admin/Socio
```

```http
GET /analytics/socios/top
Descripción: Top 3 socios con más ingresos esta semana
Headers: Authorization: Bearer {token}
Permisos: Admin
```

```http
GET /analytics/parking/{parkingId}/earnings
Descripción: Ganancias (hoy/semana/mes/año) de un parqueadero
Headers: Authorization: Bearer {token}
Permisos: Admin/Socio
```

```http
GET /analytics/parking/{parkingId}/vehicles/top
Descripción: Top 10 vehículos más registrados en un parqueadero específico
Headers: Authorization: Bearer {token}
Permisos: Admin/Socio
```

```http
GET /analytics/parking/{parkingId}/vehicles/first-time
Descripción: Vehículos registrados por primera vez en el parqueadero
Headers: Authorization: Bearer {token}
Permisos: Admin/Socio
```

```http
GET /analytics/parkings/top
Descripción: Top 3 parqueaderos con mayor ganancia semanal
Headers: Authorization: Bearer {token}
Permisos: Admin
```


### VEHÍCULOS

```http
POST /vehicles/entry
Descripción: Registrar entrada de vehículo
Headers: Authorization: Bearer {token}
Body: {"placa": "ABC123", "parqueaderoId": 1}
Permisos: Socio
```

```http
POST /vehicles/exit
Descripción: Registrar salida de vehículo
Headers: Authorization: Bearer {token}
Body: {"placa": "ABC123", "parqueaderoId": 1}
Permisos: Socio
```



### Parqueaderos

```http
POST /parkings
Descripción: Crea nuevo parqueadero
Headers: Authorization: Bearer {token}
Body: {
  "nombre": "Nombre",
  "capacidad": 50,
  "costoPorHora": 3.5,
  "socioId": 2
}
Permisos: Admin
```

```http
GET /parkings
Descripción: Lista TODOS los parqueaderos
Headers: Authorization: Bearer {token}
Permisos: Admin
```

```http
GET /parkings/{id}
Descripción: Obtiene detalles de un parqueadero
Headers: Authorization: Bearer {token}
Permisos: Admin
```

```http
PUT /parkings/{id}
Descripción: Actualiza parqueadero
Headers: Authorization: Bearer {token}
Body: {
  "nombre": "Nombre Actualizado",
  "capacidad": 60,
  "costoPorHora": 4.0,
  "socioId": 2
}
Permisos: Admin
```

```http
DELETE /parkings/{id}
Descripción: Elimina un parqueadero
Headers: Authorization: Bearer {token}
Permisos: Admin
```

```http
GET /parkings/{id}/capacity
Descripción: Consulta capacidad disponible
Headers: Authorization: Bearer {token}
Permisos: Admin
```

```http
GET /parkings/{id}/vehicles
Descripción: Lista vehículos en el parqueadero
Headers: Authorization: Bearer {token}
Permisos: Admin
```

```http
GET /parkings/my-parkings
Descripción: Lista parqueaderos del socio actual
Headers: Authorization: Bearer {token}
Permisos: Socio
```

```http
GET /parkings/my-parkings/{id}/vehicles
Descripción: Vehículos en parqueadero del socio
Headers: Authorization: Bearer {token}
Permisos: Socio
```


### EMAIL (SIMULACIÓN)

```http
POST /email/send
Descripción: Simula envío de notificación por email
Body: {
  "email": "destino@mail.com",
  "placa": "ABC123",
  "mensaje": "Su vehículo ha ingresado",
  "parqueaderoNombre": "Parqueadero Central"
}
```

