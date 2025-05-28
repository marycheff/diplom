-- AlterTable
ALTER TABLE "test_snapshots" ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "questions_testId_idx" ON "questions"("testId");

-- CreateIndex
CREATE INDEX "questions_text_idx" ON "questions"("text");

-- CreateIndex
CREATE INDEX "tests_title_idx" ON "tests"("title");

-- CreateIndex
CREATE INDEX "tests_description_idx" ON "tests"("description");

-- CreateIndex
CREATE INDEX "tests_authorId_idx" ON "tests"("authorId");

-- CreateIndex
CREATE INDEX "tests_createdAt_idx" ON "tests"("createdAt");

-- CreateIndex
CREATE INDEX "users_name_idx" ON "users"("name");

-- CreateIndex
CREATE INDEX "users_surname_idx" ON "users"("surname");

-- CreateIndex
CREATE INDEX "users_patronymic_idx" ON "users"("patronymic");

-- CreateIndex
CREATE INDEX "users_createdAt_idx" ON "users"("createdAt");
