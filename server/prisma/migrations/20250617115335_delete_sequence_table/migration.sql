/*
  Warnings:

  - You are about to drop the `user_sequence_orders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_sequence_orders" DROP CONSTRAINT "user_sequence_orders_answerId_fkey";

-- DropForeignKey
ALTER TABLE "user_sequence_orders" DROP CONSTRAINT "user_sequence_orders_attemptId_fkey";

-- DropTable
DROP TABLE "user_sequence_orders";
