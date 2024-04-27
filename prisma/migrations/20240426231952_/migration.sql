/*
  Warnings:

  - You are about to drop the column `parkingId` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the `Parking` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_parkingId_fkey";

-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "parkingId";

-- DropTable
DROP TABLE "Parking";
