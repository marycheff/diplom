-- AlterTable
ALTER TABLE "test_attempts" ADD COLUMN     "snapshotId" TEXT;

-- CreateTable
CREATE TABLE "test_snapshots" (
    "id" TEXT NOT NULL,
    "testId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "ModerationStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "test_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_snapshots" (
    "id" TEXT NOT NULL,
    "snapshotId" TEXT NOT NULL,
    "originalId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "type" "QuestionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "question_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answer_snapshots" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "originalId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "answer_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_settings_snapshots" (
    "id" TEXT NOT NULL,
    "snapshotId" TEXT NOT NULL,
    "requireRegistration" BOOLEAN NOT NULL DEFAULT false,
    "inputFields" JSONB,
    "showDetailedResults" BOOLEAN NOT NULL DEFAULT false,
    "shuffleQuestions" BOOLEAN NOT NULL DEFAULT false,
    "shuffleAnswers" BOOLEAN NOT NULL DEFAULT false,
    "timeLimit" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "test_settings_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "test_settings_snapshots_snapshotId_key" ON "test_settings_snapshots"("snapshotId");

-- AddForeignKey
ALTER TABLE "test_attempts" ADD CONSTRAINT "test_attempts_snapshotId_fkey" FOREIGN KEY ("snapshotId") REFERENCES "test_snapshots"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_snapshots" ADD CONSTRAINT "test_snapshots_testId_fkey" FOREIGN KEY ("testId") REFERENCES "tests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_snapshots" ADD CONSTRAINT "question_snapshots_snapshotId_fkey" FOREIGN KEY ("snapshotId") REFERENCES "test_snapshots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answer_snapshots" ADD CONSTRAINT "answer_snapshots_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "question_snapshots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_settings_snapshots" ADD CONSTRAINT "test_settings_snapshots_snapshotId_fkey" FOREIGN KEY ("snapshotId") REFERENCES "test_snapshots"("id") ON DELETE CASCADE ON UPDATE CASCADE;
