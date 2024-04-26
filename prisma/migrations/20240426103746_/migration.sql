/*
  Warnings:

  - Added the required column `weight` to the `CargoType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `SpecialCondition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Urgency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CargoType" ADD COLUMN     "weight" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SpecialCondition" ADD COLUMN     "weight" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Urgency" ADD COLUMN     "weight" INTEGER NOT NULL;
