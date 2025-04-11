-- AlterTable
ALTER TABLE "test_settings" ADD COLUMN     "shuffleAnswers" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "shuffleQuestions" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "timeLimit" SET DEFAULT 0;
