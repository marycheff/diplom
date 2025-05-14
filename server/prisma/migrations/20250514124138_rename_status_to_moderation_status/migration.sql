/*
  Warnings:

  - You are about to drop the column `status` on the `test_snapshots` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `tests` table. All the data in the column will be lost.
  - Added the required column `moderationStatus` to the `test_snapshots` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- Переименовываем колонку "status" в "moderationStatus"
ALTER TABLE "test_snapshots" RENAME COLUMN "status" TO "moderationStatus";

-- Если нужно, также для таблицы "tests"
ALTER TABLE "tests" RENAME COLUMN "status" TO "moderationStatus";