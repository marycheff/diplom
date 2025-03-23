import answerController from "@/controllers/tests/answer.controller"
import attemptController from "@/controllers/tests/attempt.controller"
import questionController from "@/controllers/tests/question.controller"
import testController from "@/controllers/tests/test.controller"
import { adminMiddleware } from "@/middleware/admin.middleware"
import { authMiddleware } from "@/middleware/auth.middleware"
import conditionalAuthMiddleware from "@/middleware/conditional.middleware"
import {
    answerOwnershipMiddleware,
    questionOwnershipMiddleware,
    testOwnershipMiddleware,
} from "@/middleware/ownership.middleware"
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
router.get("/search", authMiddleware, testController.searchTests)

// Создание теста
router.post("/create", authMiddleware, validateRequest(createTestSchema), testController.createTest)
// Получение всех тестов пользователя (только свои)
router.get("/user-tests", authMiddleware, testController.getUserTests)
// Получение всех тестов (админ)
router.get("/all-tests", authMiddleware, adminMiddleware, testController.getAllTests)
// Удаление теста
router.delete("/:testId", authMiddleware, testOwnershipMiddleware, testController.deleteTest)
router.put("/:testId/settings", authMiddleware, testOwnershipMiddleware, testController.updateTestSettings)
// Получение теста по ID
router.get("/:testId", authMiddleware, testOwnershipMiddleware, testController.getTestById)

/* =================================
    Управление вопросами теста
  ================================= */

// Добавление вопросов к тесту
router.put("/:testId/questions", authMiddleware, validateRequest(updateTestSchema), testController.updateTest)

// Получение всех вопросов теста
router.get("/:testId/questions", authMiddleware, questionController.getTestQuestions)

// Обновление вопроса
router.put(
    "/questions/:questionId",
    authMiddleware,
    validateRequest(updateQuestionSchema),
    questionController.updateQuestion
)
// Удаление вопроса из теста
router.delete("/questions/:questionId", authMiddleware, questionOwnershipMiddleware, questionController.deleteQuestion)

// Удаление всех вопросов из теста
router.delete("/:testId/questions", authMiddleware, questionOwnershipMiddleware, questionController.deleteAllQuestions)

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

/* =================================
    Попытки прохождения теста
 * ================================= */

// Получение всех попыток (админ)
router.get("/attempts/all", authMiddleware, adminMiddleware, attemptController.getAllAttempts)

// Начало попытки прохождения теста
router.post(
    "/:testId/start",
    // authMiddleware,
    conditionalAuthMiddleware,
    validateRequest(startTestAttemptSchema),
    attemptController.startTestAttempt
)

// Сохранение ответа во время попытки
router.post(
    "/attempts/:attemptId/answers",
    // authMiddleware,
    conditionalAuthMiddleware,
    validateRequest(saveAnswerSchema),
    attemptController.saveAnswer
)
// Завершение попытки
router.post(
    "/attempts/:attemptId/complete",
    // authMiddleware,
    validateRequest(completeTestAttemptSchema),
    attemptController.completeTestAttempt
)

router.get("/attempts/:attemptId/", authMiddleware, adminMiddleware, attemptController.getAttempt)

router.get("/:testId/attempts", authMiddleware, testOwnershipMiddleware, attemptController.getTestAttempts)

export default router
