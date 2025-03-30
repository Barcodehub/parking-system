/*
  Warnings:

  - Added the required column `socioId` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "socioId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_socioId_fkey" FOREIGN KEY ("socioId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
