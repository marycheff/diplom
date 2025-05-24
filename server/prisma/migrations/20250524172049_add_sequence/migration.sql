-- AlterTable
ALTER TABLE "answer_snapshots" ADD COLUMN     "sequencePosition" INTEGER;

-- AlterTable
ALTER TABLE "answers" ADD COLUMN     "sequencePosition" INTEGER;

-- CreateTable
CREATE TABLE "user_sequence_orders" (
    "id" TEXT NOT NULL,
    "attemptId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "answerId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "timeSpent" INTEGER,
    "answeredAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_sequence_orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_sequence_orders_attemptId_questionId_answerId_key" ON "user_sequence_orders"("attemptId", "questionId", "answerId");

-- CreateIndex
CREATE UNIQUE INDEX "user_sequence_orders_attemptId_questionId_position_key" ON "user_sequence_orders"("attemptId", "questionId", "position");

-- AddForeignKey
ALTER TABLE "user_sequence_orders" ADD CONSTRAINT "user_sequence_orders_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "answers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_sequence_orders" ADD CONSTRAINT "user_sequence_orders_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "test_attempts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
