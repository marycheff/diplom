/*
  Warnings:

  - A unique constraint covering the columns `[testSnapshotId]` on the table `test_settings_snapshots` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "question_snapshots" DROP CONSTRAINT "question_snapshots_snapshotId_fkey";

-- DropForeignKey
ALTER TABLE "test_attempts" DROP CONSTRAINT "test_attempts_snapshotId_fkey";

-- DropForeignKey
ALTER TABLE "test_settings_snapshots" DROP CONSTRAINT "test_settings_snapshots_snapshotId_fkey";

-- DropIndex
DROP INDEX "test_settings_snapshots_snapshotId_key";

-- Переименование колонок вместо удаления и создания новых
ALTER TABLE "answer_snapshots" RENAME COLUMN "originalId" TO "originalTestId";

ALTER TABLE "question_snapshots" RENAME COLUMN "originalId" TO "originalTestId";
ALTER TABLE "question_snapshots" RENAME COLUMN "snapshotId" TO "testSnapshotId";

ALTER TABLE "test_attempts" RENAME COLUMN "snapshotId" TO "testSnapshotId";

ALTER TABLE "test_settings_snapshots" RENAME COLUMN "snapshotId" TO "testSnapshotId";

-- CreateIndex
CREATE UNIQUE INDEX "test_settings_snapshots_testSnapshotId_key" ON "test_settings_snapshots"("testSnapshotId");

-- AddForeignKey
ALTER TABLE "test_attempts" ADD CONSTRAINT "test_attempts_testSnapshotId_fkey" FOREIGN KEY ("testSnapshotId") REFERENCES "test_snapshots"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_snapshots" ADD CONSTRAINT "question_snapshots_testSnapshotId_fkey" FOREIGN KEY ("testSnapshotId") REFERENCES "test_snapshots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_settings_snapshots" ADD CONSTRAINT "test_settings_snapshots_testSnapshotId_fkey" FOREIGN KEY ("testSnapshotId") REFERENCES "test_snapshots"("id") ON DELETE CASCADE ON UPDATE CASCADE;