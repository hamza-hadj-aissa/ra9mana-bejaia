/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `CargoType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `SpecialCondition` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Urgency` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CargoType_name_key" ON "CargoType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SpecialCondition_name_key" ON "SpecialCondition"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Urgency_name_key" ON "Urgency"("name");
