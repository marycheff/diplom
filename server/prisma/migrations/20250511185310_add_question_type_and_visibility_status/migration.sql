-- CreateEnum
CREATE TYPE "TestVisibilityStatus" AS ENUM ('HIDDEN', 'PUBLISHED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "QuestionType" ADD VALUE 'TEXT_INPUT';
ALTER TYPE "QuestionType" ADD VALUE 'MATCHING';
ALTER TYPE "QuestionType" ADD VALUE 'FILL_IN_THE_BLANK';
ALTER TYPE "QuestionType" ADD VALUE 'SEQUENCE';

-- AlterTable
ALTER TABLE "test_snapshots" ADD COLUMN     "visibilityStatus" "TestVisibilityStatus" NOT NULL DEFAULT 'PUBLISHED';

-- AlterTable
ALTER TABLE "tests" ADD COLUMN     "visibilityStatus" "TestVisibilityStatus" NOT NULL DEFAULT 'PUBLISHED';
