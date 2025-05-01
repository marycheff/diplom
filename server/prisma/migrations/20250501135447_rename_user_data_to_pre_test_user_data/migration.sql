/*
  Warnings:

  - You are about to drop the column `userData` on the `test_attempts` table. All the data in the column will be lost.

*/
-- AlterTable
-- Переименование столбца
ALTER TABLE "test_attempts" RENAME COLUMN "userData" TO "preTestUserData";