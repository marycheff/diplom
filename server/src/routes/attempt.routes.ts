import {attemptController} from "@/controllers/tests/attempt.controller"
import { adminMiddleware } from "@/middleware/admin.middleware"
import { authMiddleware } from "@/middleware/auth.middleware"
import conditionalAuthMiddleware from "@/middleware/conditional.middleware"
import { attemptOwnershipMiddleware, testOwnershipMiddleware } from "@/middleware/ownership.middleware"
import { validateRequest } from "@/middleware/validate-request.middleware"
import { completeTestAttemptSchema, getAttemptSchema, startTestAttemptSchema } from "@/schemas/test.schema"
import express from "express"

const router = express.Router()

/* =================================
    Попытки прохождения теста
 * ================================= */

// Получение всех попыток
router.get("/attempts/all", authMiddleware, adminMiddleware, attemptController.getAllAttempts)

// Получение своих попыток пользователем
router.get("/attempts/my-attempts", authMiddleware, attemptController.getMyAttempts)

// Получение всех попыток теста
router.get("/:testId/attempts", authMiddleware, testOwnershipMiddleware, attemptController.getTestAttempts)

// Получение попыток пользователя
router.get("/attempts/users/:userId", attemptController.getUserAttempts)

// Начало попытки прохождения теста
router.post(
    "/:testId/start",
    conditionalAuthMiddleware,
    validateRequest(startTestAttemptSchema),
    attemptController.startAttempt
)

// Сохранение ответов во время попытки
router.post(
    "/attempts/:attemptId/answers",
    conditionalAuthMiddleware,
    // validateRequest(saveAnswersSchema),
    attemptController.saveAnswers
)

// Синхронизация таймера теста
router.post("/attempts/:attemptId/time-spent", conditionalAuthMiddleware, attemptController.updateTimeSpent)

// Завершение попытки
router.post(
    "/attempts/:attemptId/complete",
    validateRequest(completeTestAttemptSchema),
    attemptController.completeAttempt
)

// Получение попытки для тестируемого
router.get(
    "/attempts/:attemptId/for-user",
    conditionalAuthMiddleware,
    validateRequest(getAttemptSchema),
    attemptController.getAttemptForUser
)

// Получение результатов попытки (прохождения)
router.get(
    "/attempts/:attemptId/results",
    conditionalAuthMiddleware,
    validateRequest(getAttemptSchema),
    attemptController.getAttemptResults
)

// Получение попытки
router.get(
    "/attempts/:attemptId/",
    authMiddleware,
    attemptOwnershipMiddleware,
    validateRequest(getAttemptSchema),
    attemptController.getAttempt
)

export default router
