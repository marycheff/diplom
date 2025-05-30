import { testController } from "@/controllers"
import {
	accountActivationMiddleware,
	adminMiddleware,
	authMiddleware,
	testOwnershipMiddleware,
	validateRequest
} from "@/middleware"
import { attemptRoutes, questionRoutes } from "@/routes"
import { getTestSnapshotSchema, shortInfoSchema, testIdSchema, testSettingsSchema } from "@/schemas/test.schema"
import express from "express"

const router = express.Router()

// Подключение дочерних маршрутизаторов
router.use("/", questionRoutes)
router.use("/", attemptRoutes)

/* =================================
        Управление тестами
  ================================= */

// Получение всех тестов пользователя (только свои)
router.get("/my-tests", authMiddleware, testController.getMyTests)

// Получение всех тестов пользователя
router.get("/users/:userId", authMiddleware, adminMiddleware, testController.getUserTests)

// Получение всех тестов (админ)
router.get("/all-tests", authMiddleware, adminMiddleware, testController.getAllTests)

// Получение всех немодерированных тестов (админ)
router.get("/all-unmoderated-tests", authMiddleware, adminMiddleware, testController.getAllUnmoderatedTests)

// Поиск теста
router.get("/search", authMiddleware, testController.searchTests)

// Поиск тестов пользователя
router.get("/my-tests/search", authMiddleware, testController.searchMyTests)

// Создание теста
router.post(
	"/create",
	authMiddleware,
	accountActivationMiddleware,
	validateRequest(shortInfoSchema),
	testController.createTest
)

// Изменение настроек теста
router.put(
	"/:testId/settings",
	authMiddleware,
	accountActivationMiddleware,
	testOwnershipMiddleware,
	validateRequest(testSettingsSchema),
	testController.updateTestSettings
)

// Изменение короткой информацией о тесте
router.put(
	"/:testId/short-info",
	authMiddleware,
	testOwnershipMiddleware,
	validateRequest(shortInfoSchema),
	testController.updateShortInfo
)

// Изменение статуса Модерации теста
router.put(
	"/:testId/visibility",
	authMiddleware,
	accountActivationMiddleware,
	testOwnershipMiddleware,
	testController.updateVisibilityStatus
)
router.put("/:testId/moderation-status", authMiddleware, adminMiddleware, testController.updateModerationStatus)

// Получение теста по ID для тестируемого
router.get("/:testId/for-attempt", validateRequest(testIdSchema), testController.getTestForAttempt)
router.get("/:testId/basic", validateRequest(testIdSchema), testController.getBasicTestInfo)
router.get("/snapshot/:snapshotId/for-attempt", testController.getTestSnapshotForAttempt)

// Получение теста по ID
router.get("/:testId", authMiddleware, testOwnershipMiddleware, testController.getTestById)
// Удаление теста
router.delete("/:testId", authMiddleware, testOwnershipMiddleware, testController.deleteTest)

// Получение снимка теста по ID
router.get(
	"/snapshot/:snapshotId",
	authMiddleware,
	validateRequest(getTestSnapshotSchema),
	testController.getTestSnapshot
)

export const testRoutes = router
