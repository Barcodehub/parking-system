/*
  Warnings:

  - You are about to drop the column `socioId` on the `vehicles` table. All the data in the column will be lost.
  - Added the required column `socioId` to the `vehicle_history` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_socioId_fkey";

-- DropIndex
DROP INDEX "vehicles_placa_fechaSalida_key";

-- AlterTable
ALTER TABLE "vehicle_history" ADD COLUMN     "socioId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "socioId";

-- AddForeignKey
ALTER TABLE "vehicle_history" ADD CONSTRAINT "vehicle_history_socioId_fkey" FOREIGN KEY ("socioId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
