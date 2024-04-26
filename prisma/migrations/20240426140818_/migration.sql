/*
  Warnings:

  - Added the required column `updatedAt` to the `CargoType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Jwt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ResetToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Ships` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `SpecialCondition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deckId` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Urgency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CargoType" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Jwt" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ResetToken" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Ships" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "SpecialCondition" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "deckId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Urgency" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Decks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Decks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Decks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
