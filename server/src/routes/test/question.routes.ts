import { questionController } from "@/controllers"
import { authMiddleware, testOwnershipMiddleware, validateRequest } from "@/middleware"
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
