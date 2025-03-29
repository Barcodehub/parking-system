-- CreateTable
CREATE TABLE "parkings" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "capacidad" INTEGER NOT NULL,
    "costoPorHora" DECIMAL(65,30) NOT NULL,
    "socioId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parkings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" SERIAL NOT NULL,
    "placa" VARCHAR(6) NOT NULL,
    "fechaIngreso" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaSalida" TIMESTAMP(3),
    "parqueaderoId" INTEGER NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_history" (
    "id" SERIAL NOT NULL,
    "placa" VARCHAR(6) NOT NULL,
    "fechaIngreso" TIMESTAMP(3) NOT NULL,
    "fechaSalida" TIMESTAMP(3) NOT NULL,
    "parqueaderoId" INTEGER NOT NULL,

    CONSTRAINT "vehicle_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "parkings" ADD CONSTRAINT "parkings_socioId_fkey" FOREIGN KEY ("socioId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_parqueaderoId_fkey" FOREIGN KEY ("parqueaderoId") REFERENCES "parkings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
