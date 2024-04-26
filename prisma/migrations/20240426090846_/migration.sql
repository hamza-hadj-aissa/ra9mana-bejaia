/*
  Warnings:

  - You are about to drop the `Ship` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_shipId_fkey";

-- DropTable
DROP TABLE "Ship";

-- CreateTable
CREATE TABLE "Ships" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ships_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_shipId_fkey" FOREIGN KEY ("shipId") REFERENCES "Ships"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
