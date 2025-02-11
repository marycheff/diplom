import express from "express"
import testController from "@/controllers/test.controller"
import { adminMiddleware, authMiddleware } from "@/middleware/auth.middleware"
import { validateRequest } from "@/middleware/validate-request.middleware"
import { createTestSchema, updateTestSchema, updateQuestionSchema } from "@/schemas/test.schema"

const router = express.Router()

// Создание теста
router.post("/create", authMiddleware, validateRequest(createTestSchema), testController.createTest)

// Добавление вопросов к тесту
router.put("/:testId/questions", authMiddleware, validateRequest(updateTestSchema), testController.updateTest)

// Удаление теста
router.delete("/:testId", authMiddleware, testController.deleteTest)

// Удаление вопроса из теста
router.delete("/questions/:questionId", authMiddleware, testController.deleteQuestion)

// Удаление всех вопросов из теста
router.delete("/:testId/questions", authMiddleware, testController.deleteAllQuestions)

// Удаление ответа из вопроса
router.delete("/answers/:answerId", authMiddleware, testController.deleteAnswer)

// Получение всех тестов пользователя (только свои)
router.get("/user-tests", authMiddleware, testController.getUserTests)

// Получение всех тестов (админ)
router.get("/all-tests", authMiddleware, adminMiddleware, testController.getAllTests)

// Получение теста по ID
router.get("/:testId", authMiddleware, testController.getTestById)

// Получение всех вопросов теста
router.get("/:testId/questions", authMiddleware, testController.getTestQuestions)

// Получение всех ответов вопроса
router.get("/questions/:questionId/answers", authMiddleware, testController.getQuestionAnswers)

// Обновление вопроса
router.put(
    "/questions/:questionId",
    authMiddleware,
    validateRequest(updateQuestionSchema),
    testController.updateQuestion
)

export default router
