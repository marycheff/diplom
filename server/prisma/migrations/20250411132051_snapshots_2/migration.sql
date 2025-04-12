-- AlterTable
ALTER TABLE "test_snapshots" ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "tests" ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1;
