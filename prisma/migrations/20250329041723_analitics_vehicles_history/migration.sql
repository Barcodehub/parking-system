-- AlterTable
ALTER TABLE "vehicle_history" ADD COLUMN     "costo" DECIMAL(65,30) NOT NULL DEFAULT 0.0;

-- AddForeignKey
ALTER TABLE "vehicle_history" ADD CONSTRAINT "vehicle_history_parqueaderoId_fkey" FOREIGN KEY ("parqueaderoId") REFERENCES "parkings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
