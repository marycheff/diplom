import testController from "@/controllers/test.controller"
import { adminMiddleware, authMiddleware } from "@/middleware/auth.middleware"
import { questionOwnershipOrAdminMiddleware, testOwnershipOrAdminMiddleware } from "@/middleware/ownership.middleware"
import { validateRequest } from "@/middleware/validate-request.middleware"
import {
    completeTestAttemptSchema,
    createTestSchema,
    saveAnswerSchema,
    startTestAttemptSchema,
    updateQuestionSchema,
    updateTestSchema,
} from "@/schemas/test.schema"
import express from "express"

const router = express.Router()

/* =================================
        Управление тестами
  ================================= */

// Создание теста
router.post("/create", authMiddleware, validateRequest(createTestSchema), testController.createTest)
// Получение теста по ID
// Получение всех тестов пользователя (только свои)
router.get("/user-tests", authMiddleware, testController.getUserTests)
// Получение всех тестов (админ)
router.get("/all-tests", authMiddleware, adminMiddleware, testController.getAllTests)
// Удаление теста
router.delete("/:testId", authMiddleware, testOwnershipOrAdminMiddleware, testController.deleteTest)
router.put("/:testId/settings", authMiddleware, testOwnershipOrAdminMiddleware, testController.updateTestSettings)
router.get("/:testId", authMiddleware, testOwnershipOrAdminMiddleware, testController.getTestById)

/* =================================
    Управление вопросами теста
  ================================= */

// Добавление вопросов к тесту
router.put("/:testId/questions", authMiddleware, validateRequest(updateTestSchema), testController.updateTest)

// Получение всех вопросов теста
router.get("/:testId/questions", authMiddleware, testController.getTestQuestions)

// Обновление вопроса
router.put(
    "/questions/:questionId",
    authMiddleware,
    validateRequest(updateQuestionSchema),
    testController.updateQuestion
)
// Удаление вопроса из теста
router.delete(
    "/questions/:questionId",
    authMiddleware,
    questionOwnershipOrAdminMiddleware,
    testController.deleteQuestion
)

// Удаление всех вопросов из теста
router.delete(
    "/:testId/questions",
    authMiddleware,
    questionOwnershipOrAdminMiddleware,
    testController.deleteAllQuestions
)

/* =================================
    Управление ответами на вопросы
 * ================================= */

// Получение всех ответов вопроса
router.get("/questions/:questionId/answers", authMiddleware, testController.getQuestionAnswers)

// Удаление ответа из вопроса
router.delete("/answers/:answerId", authMiddleware, testController.deleteAnswer)

/* =================================
    Попытки прохождения теста
 * ================================= */

// Получение всех попыток (админ)
router.get("/attempts/all", authMiddleware, adminMiddleware, testController.getAllAttempts)

// Начало попытки прохождения теста
router.post("/:testId/start", authMiddleware, validateRequest(startTestAttemptSchema), testController.startTestAttempt)

// Сохранение ответа во время попытки
router.post(
    "/attempts/:attemptId/answers",
    authMiddleware,
    validateRequest(saveAnswerSchema),
    testController.saveAnswer
)
// Завершение попытки
router.post(
    "/attempts/:attemptId/complete",
    authMiddleware,
    validateRequest(completeTestAttemptSchema),
    testController.completeTestAttempt
)

router.get("/attempts/:attemptId/", authMiddleware, adminMiddleware, testController.getAttempt)

export default router
