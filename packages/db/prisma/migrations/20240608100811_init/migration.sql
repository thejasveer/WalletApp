/*
  Warnings:

  - You are about to drop the `OnRampTransaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "RampType" AS ENUM ('ON_RAMP', 'OFF_RAMP');

-- CreateEnum
CREATE TYPE "RampStatus" AS ENUM ('Success', 'Failure', 'Processing', 'Initiated');

-- DropForeignKey
ALTER TABLE "OnRampTransaction" DROP CONSTRAINT "OnRampTransaction_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "netbankingId" TEXT;

-- DropTable
DROP TABLE "OnRampTransaction";

-- DropEnum
DROP TYPE "OnRampStatus";

-- CreateTable
CREATE TABLE "RampTransaction" (
    "id" SERIAL NOT NULL,
    "status" "RampStatus" NOT NULL,
    "type" "RampType" NOT NULL,
    "token" TEXT NOT NULL,
    "provider" TEXT,
    "paymentId" TEXT,
    "amount" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "RampTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RampTransaction_token_key" ON "RampTransaction"("token");

-- CreateIndex
CREATE UNIQUE INDEX "RampTransaction_paymentId_key" ON "RampTransaction"("paymentId");

-- AddForeignKey
ALTER TABLE "RampTransaction" ADD CONSTRAINT "RampTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
