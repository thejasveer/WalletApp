/*
  Warnings:

  - You are about to drop the column `netbankingId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "netbankingId",
ADD COLUMN     "netbankingLoginToken" TEXT;
