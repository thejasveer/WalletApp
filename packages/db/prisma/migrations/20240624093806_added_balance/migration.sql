/*
  Warnings:

  - The values [Success,Failure,Processing,Initiated] on the enum `RampStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RampStatus_new" AS ENUM ('INITIATED', 'PROCESSING', 'SUCCESS', 'FAILED');
ALTER TABLE "RampTransaction" ALTER COLUMN "status" TYPE "RampStatus_new" USING ("status"::text::"RampStatus_new");
ALTER TYPE "RampStatus" RENAME TO "RampStatus_old";
ALTER TYPE "RampStatus_new" RENAME TO "RampStatus";
DROP TYPE "RampStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Balance" ALTER COLUMN "amount" SET DEFAULT 20000,
ALTER COLUMN "locked" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "RampTransaction" ADD COLUMN     "balance" INTEGER;

-- AlterTable
ALTER TABLE "p2pTransfer" ADD COLUMN     "balance" INTEGER;
