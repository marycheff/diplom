/*
  Warnings:

  - You are about to drop the `bad_words` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bad_words" DROP CONSTRAINT "bad_words_addedById_fkey";

-- DropTable
DROP TABLE "bad_words";
