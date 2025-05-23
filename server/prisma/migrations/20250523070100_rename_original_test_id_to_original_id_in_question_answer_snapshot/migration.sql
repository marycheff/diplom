/*
  Warnings:

  - You are about to drop the column `originalTestId` on the `answer_snapshots` table. All the data in the column will be lost.
  - You are about to drop the column `originalTestId` on the `question_snapshots` table. All the data in the column will be lost.
  - Added the required column `originalId` to the `answer_snapshots` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalId` to the `question_snapshots` table without a default value. This is not possible if the table is not empty.

*/
ALTER TABLE "answer_snapshots" RENAME COLUMN "originalTestId" TO "originalId";

ALTER TABLE "question_snapshots" RENAME COLUMN "originalTestId" TO "originalId";