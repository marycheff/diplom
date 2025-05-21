import answerController from "@/controllers/tests/answer.controller"
import { authMiddleware } from "@/middleware/auth.middleware"
import { answerOwnershipMiddleware, questionOwnershipMiddleware } from "@/middleware/ownership.middleware"
import express from "express"

const router = express.Router()

/* =================================
    Управление ответами на вопросы
 * ================================= */

// Получение всех ответов вопроса
router.get(
    "/questions/:questionId/answers",
    authMiddleware,
    questionOwnershipMiddleware,
    answerController.getQuestionAnswers
)

// Удаление ответа из вопроса 
router.delete("/answers/:answerId", authMiddleware, answerOwnershipMiddleware, answerController.deleteAnswer)

export default router
