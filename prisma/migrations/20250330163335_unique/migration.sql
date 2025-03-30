/*
  Warnings:

  - A unique constraint covering the columns `[placa]` on the table `vehicles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "vehicles_placa_key" ON "vehicles"("placa");
