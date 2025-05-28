/*
  Warnings:

  - Added the required column `updatedAt` to the `test_snapshots` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "test_snapshots" ADD COLUMN "updatedAt" TIMESTAMP;
UPDATE "test_snapshots" SET "updatedAt" = NOW();
ALTER TABLE "test_snapshots" ALTER COLUMN "updatedAt" SET NOT NULL;



