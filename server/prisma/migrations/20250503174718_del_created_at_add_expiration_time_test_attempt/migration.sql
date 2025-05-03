/*
  Warnings:

  - You are about to drop the column `createdAt` on the `test_attempts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "test_attempts" DROP COLUMN "createdAt",
ADD COLUMN     "expirationTime" TIMESTAMP(3);
