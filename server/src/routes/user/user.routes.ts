import { userController } from "@/controllers"
import { accountOwnershipMiddleware, adminMiddleware, authMiddleware, validateRequest } from "@/middleware"
import { updateUserSchema, userIdSchema } from "@/schemas/user.schema"
import { Router } from "express"

const router = Router()

// Получение списка всех пользователей (админ)
router.get("/", authMiddleware, adminMiddleware, userController.getAllUsers)

// Создание нового пользователя (админ)
router.post("/create", authMiddleware, adminMiddleware, userController.createUser)

router.get("/search", authMiddleware, userController.searchUsers)

// Получение информации о пользователе по его ID
router.get("/:userId", authMiddleware, validateRequest(userIdSchema), userController.getUserById)

// Обновление данных пользователя по ID
router.put("/update-profile/:userId", authMiddleware, validateRequest(updateUserSchema), userController.updateUser)

// Удаление пользователя по ID (админ)
router.delete(
	"/:userId",
	authMiddleware,
	accountOwnershipMiddleware,
	validateRequest(userIdSchema),
	userController.deleteUser
)

// Блокировка пользователя по ID (админ)
router.post("/block/:userId", authMiddleware, adminMiddleware, validateRequest(userIdSchema), userController.blockUser)

// Разблокировка пользователя по ID (админ)
router.post(
	"/unblock/:userId",
	authMiddleware,
	adminMiddleware,
	validateRequest(userIdSchema),
	userController.unblockUser
)

export const userRoutes = router
