/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Decks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Ships` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `parkingId` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_deckId_fkey";

-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "parkingId" TEXT NOT NULL,
ALTER COLUMN "deckId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Parking" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Parking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Decks_name_key" ON "Decks"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ships_name_key" ON "Ships"("name");

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Decks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "Parking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
