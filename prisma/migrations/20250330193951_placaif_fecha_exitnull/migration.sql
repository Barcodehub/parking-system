/*
  Warnings:

  - A unique constraint covering the columns `[placa,fechaSalida]` on the table `vehicles` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "vehicles_placa_key";

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_placa_fechaSalida_key" ON "vehicles"("placa", "fechaSalida");
