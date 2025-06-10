import { attemptController } from "@/controllers"
import {
	adminMiddleware,
	attemptOwnershipMiddleware,
	authMiddleware,
	conditionalAuthMiddleware,
	testOwnershipMiddleware,
	validateRequest,
} from "@/middleware"
import { completeAttemptSchema, getAttemptSchema, saveAnswersSchema, startAttemptSchema } from "@/schemas/test.schema"
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
	validateRequest(startAttemptSchema),
	attemptController.startAttempt
)

// Сохранение ответов во время попытки
router.post(
	"/attempts/:attemptId/answers",
	conditionalAuthMiddleware,
	validateRequest(saveAnswersSchema),
	attemptController.saveAnswers
)

// Завершение попытки
router.post("/attempts/:attemptId/complete", validateRequest(completeAttemptSchema), attemptController.completeAttempt)

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

export const attemptRoutes = router
