-- AlterTable
ALTER TABLE "test_settings_snapshots" ADD COLUMN     "allowRetake" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "retakeLimit" INTEGER;
