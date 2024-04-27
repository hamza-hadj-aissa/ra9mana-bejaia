/*
  Warnings:

  - A unique constraint covering the columns `[deckId]` on the table `Trip` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Trip_deckId_key" ON "Trip"("deckId");
