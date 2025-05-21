import questionController from "@/controllers/tests/question.controller"
import { authMiddleware } from "@/middleware/auth.middleware"
import { questionOwnershipMiddleware, testOwnershipMiddleware } from "@/middleware/ownership.middleware"
import { validateRequest } from "@/middleware/validate-request.middleware"
import { upsertQuestionsSchema } from "@/schemas/test.schema"
import express from "express"

const router = express.Router()

/* =================================
    Управление вопросами теста
  ================================= */

// Получение всех вопросов теста
router.get("/:testId/questions", authMiddleware, questionController.getTestQuestions)

// Удаление всех вопросов из теста
router.delete("/:testId/questions", authMiddleware, questionOwnershipMiddleware, questionController.deleteAllQuestions)

// Добавление вопросов к тесту
router.put(
    "/:testId/questions-upsert",
    authMiddleware,
    testOwnershipMiddleware,
    validateRequest(upsertQuestionsSchema),
    questionController.upsertQuestions
)

// Удаление вопроса
router.delete("/questions/:questionId", authMiddleware, questionOwnershipMiddleware, questionController.deleteQuestion)

export default router
