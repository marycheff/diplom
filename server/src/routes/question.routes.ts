import { questionController } from "@/controllers/tests/question.controller"
import { authMiddleware } from "@/middleware/auth.middleware"
import { testOwnershipMiddleware } from "@/middleware/ownership.middleware"
import { validateRequest } from "@/middleware/validate-request.middleware"
import { upsertQuestionsSchema } from "@/schemas/test.schema"
import express from "express"

const router = express.Router()

/* =================================
    Управление вопросами теста
  ================================= */

// Добавление вопросов к тесту
router.put(
    "/:testId/questions-upsert",
    authMiddleware,
    testOwnershipMiddleware,
    validateRequest(upsertQuestionsSchema),
    questionController.upsertQuestions
)

export const questionRoutes = router
