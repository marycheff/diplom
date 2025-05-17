import answerController from "@/controllers/tests/answer.controller"
import attemptController from "@/controllers/tests/attempt.controller"
import questionController from "@/controllers/tests/question.controller"
import testController from "@/controllers/tests/test.controller"
import { accountActivationMiddleware } from "@/middleware/accountConfirmation.middleware"
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
    getAttemptSchema,
    getTestSnapshotSchema,
    saveAnswerSchema,
    shortInfoSchema,
    startTestAttemptSchema,
    testIdSchema,
    testSettingsSchema,
    upsertQuestionsSchema,
} from "@/schemas/test.schema"
import express from "express"

const router = express.Router()

/* =================================
        Управление тестами
  ================================= */

// Создание теста
router.post(
    "/create",
    authMiddleware,
    accountActivationMiddleware,
    validateRequest(shortInfoSchema),
    testController.createTest
)

// Получение всех тестов пользователя (только свои)
router.get("/my-tests", authMiddleware, testController.getMyTests)
// Получение всех тестов пользователя
router.get("/users/:userId", authMiddleware, adminMiddleware, testController.getUserTests)

// Получение всех тестов (админ)
router.get("/all-tests", authMiddleware, adminMiddleware, testController.getAllTests)
// Получение всех немодерированных тестов (админ)
router.get("/all-unmoderated-tests", authMiddleware, adminMiddleware, testController.getAllUnmoderatedTests)

// Удаление теста
router.delete("/:testId", authMiddleware, testOwnershipMiddleware, testController.deleteTest)

// Изменение настроек теста
router.put(
    "/:testId/settings",
    authMiddleware,
    accountActivationMiddleware,
    testOwnershipMiddleware,
    validateRequest(testSettingsSchema),
    testController.updateTestSettings
)

// Поиск теста
router.get("/search", authMiddleware, testController.searchTests)

// Поиск тестов пользователя
router.get("/my-tests/search", authMiddleware, testController.searchMyTests)

// Изменение короткой информацией о тесте
router.put(
    "/:testId/short-info",
    authMiddleware,
    testOwnershipMiddleware,
    validateRequest(shortInfoSchema),
    testController.updateShortInfo
)

// Получение теста по ID
router.get("/:testId", authMiddleware, testOwnershipMiddleware, testController.getTestById)
router.get("/:testId/for-user", validateRequest(testIdSchema), testController.getTestByIdForUser)

/* =================================
    Управление вопросами теста
  ================================= */

// Добавление вопросов к тесту
// router.put("/:testId/questions", authMiddleware, validateRequest(updateTestSchema), testController.updateTest)
// router.put("/:testId/questions", authMiddleware, testOwnershipMiddleware, questionController.addQuestions)
router.put(
    "/:testId/questions-upsert",
    authMiddleware,
    testOwnershipMiddleware,
    validateRequest(upsertQuestionsSchema),
    questionController.upsertQuestions
)

// Получение всех вопросов теста
router.get("/:testId/questions", authMiddleware, questionController.getTestQuestions)

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
    "/attempts/:attemptId/answer",
    // authMiddleware,
    conditionalAuthMiddleware,
    validateRequest(saveAnswerSchema),
    attemptController.saveAnswer
)
// Сохранение ответа во время попытки
router.post(
    "/attempts/:attemptId/answers",
    // authMiddleware,
    conditionalAuthMiddleware,
    // validateRequest(saveAnswersSchema),
    attemptController.saveAnswers
)
// Завершение попытки
router.post(
    "/attempts/:attemptId/complete",
    // authMiddleware,
    validateRequest(completeTestAttemptSchema),
    attemptController.completeAttempt
)

router.get("/attempts/:attemptId/for-user", validateRequest(getAttemptSchema), attemptController.getAttemptForUser)
router.get(
    "/attempts/:attemptId/results",
    conditionalAuthMiddleware,
    validateRequest(getAttemptSchema),
    attemptController.getAttemptResults
)
router.get("/:testId/attempts", authMiddleware, testOwnershipMiddleware, attemptController.getTestAttempts)

router.get("/attempts/my-attempts", authMiddleware, attemptController.getMyAttempts)
router.get("/attempts/users/:userId", attemptController.getUserAttempts)
router.post("/attempts/:attemptId/time-spent", conditionalAuthMiddleware, attemptController.updateTimeSpent)

router.get(
    "/attempts/:attemptId/",
    authMiddleware,
    adminMiddleware,
    validateRequest(getAttemptSchema),
    attemptController.getAttempt
)
// router.get(
//     "/user-attempts/:userId",
//     authMiddleware,
//     testOwnershipMiddleware,
//     validateRequest(getUserAttemptsSchema),
//     attemptController.getUserAttempts
// )

// Получение снимка теста по ID
router.get(
    "/snapshot/:snapshotId",
    authMiddleware,
    validateRequest(getTestSnapshotSchema),
    testController.getTestSnapshot
)
// Изменение статуса Модерации теста
router.put(
    "/:testId/visibility",
    authMiddleware,
    accountActivationMiddleware,
    testOwnershipMiddleware,
    testController.changeVisibilityStatus
)
router.put("/:testId/moderation-status", authMiddleware, adminMiddleware, testController.changeModerationStatus)

export default router
