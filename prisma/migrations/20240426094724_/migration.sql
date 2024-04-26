/*
  Warnings:

  - The primary key for the `CargoType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Jwt` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ResetToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Ships` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SpecialCondition` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Trip` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `Trip` table. All the data in the column will be lost.
  - The primary key for the `Urgency` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Jwt" DROP CONSTRAINT "Jwt_userId_fkey";

-- DropForeignKey
ALTER TABLE "ResetToken" DROP CONSTRAINT "ResetToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_cargoId_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_shipId_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_specialConditionId_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_urgencyId_fkey";

-- AlterTable
ALTER TABLE "CargoType" DROP CONSTRAINT "CargoType_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "CargoType_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CargoType_id_seq";

-- AlterTable
ALTER TABLE "Jwt" DROP CONSTRAINT "Jwt_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Jwt_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Jwt_id_seq";

-- AlterTable
ALTER TABLE "ResetToken" DROP CONSTRAINT "ResetToken_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ResetToken_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ResetToken_id_seq";

-- AlterTable
ALTER TABLE "Ships" DROP CONSTRAINT "Ships_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Ships_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Ships_id_seq";

-- AlterTable
ALTER TABLE "SpecialCondition" DROP CONSTRAINT "SpecialCondition_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SpecialCondition_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SpecialCondition_id_seq";

-- AlterTable
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_pkey",
DROP COLUMN "name",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "shipId" SET DATA TYPE TEXT,
ALTER COLUMN "cargoId" SET DATA TYPE TEXT,
ALTER COLUMN "urgencyId" SET DATA TYPE TEXT,
ALTER COLUMN "specialConditionId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Trip_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Trip_id_seq";

-- AlterTable
ALTER TABLE "Urgency" DROP CONSTRAINT "Urgency_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Urgency_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Urgency_id_seq";

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Users_id_seq";

-- AddForeignKey
ALTER TABLE "Jwt" ADD CONSTRAINT "Jwt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResetToken" ADD CONSTRAINT "ResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_shipId_fkey" FOREIGN KEY ("shipId") REFERENCES "Ships"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "CargoType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_urgencyId_fkey" FOREIGN KEY ("urgencyId") REFERENCES "Urgency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_specialConditionId_fkey" FOREIGN KEY ("specialConditionId") REFERENCES "SpecialCondition"("id") ON DELETE SET NULL ON UPDATE CASCADE;
