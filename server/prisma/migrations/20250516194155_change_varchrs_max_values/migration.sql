/*
  Warnings:

  - You are about to alter the column `text` on the `answer_snapshots` table. The data in that column could be lost. The data in that column will be cast from `VarChar(500)` to `VarChar(255)`.
  - You are about to alter the column `text` on the `answers` table. The data in that column could be lost. The data in that column will be cast from `VarChar(500)` to `VarChar(255)`.
  - You are about to alter the column `text` on the `question_snapshots` table. The data in that column could be lost. The data in that column will be cast from `VarChar(1000)` to `VarChar(500)`.
  - You are about to alter the column `text` on the `questions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(1000)` to `VarChar(500)`.
  - You are about to alter the column `textAnswer` on the `user_answers` table. The data in that column could be lost. The data in that column will be cast from `VarChar(1000)` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "answer_snapshots" ALTER COLUMN "text" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "answers" ALTER COLUMN "text" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "question_snapshots" ALTER COLUMN "text" SET DATA TYPE VARCHAR(500);

-- AlterTable
ALTER TABLE "questions" ALTER COLUMN "text" SET DATA TYPE VARCHAR(500);

-- AlterTable
ALTER TABLE "user_answers" ALTER COLUMN "textAnswer" SET DATA TYPE VARCHAR(255);
