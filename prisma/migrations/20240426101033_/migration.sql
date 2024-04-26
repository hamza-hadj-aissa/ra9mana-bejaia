/*
  Warnings:

  - Added the required column `arrivalTime` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departureTime` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parkingTime` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "arrivalTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "departureTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "parkingTime" TIMESTAMP(3) NOT NULL;
