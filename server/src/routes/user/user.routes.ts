import { userController } from "@/controllers"
import { adminMiddleware, authMiddleware, validateRequest } from "@/middleware"
import { userIdSchema } from "@/schemas/user.schema"
import { Router } from "express"

const router = Router()

// Получение списка всех пользователей (админ)
router.get("/", authMiddleware, adminMiddleware, userController.getAllUsers)

// Создание нового пользователя (админ)
router.post("/create", authMiddleware, adminMiddleware, userController.createUser)

router.get("/search", authMiddleware, userController.searchUsers)

// Получение информации о пользователе по его ID
router.get("/:id", authMiddleware, validateRequest(userIdSchema), userController.getUserById)

// Обновление данных пользователя по ID
router.put("/update-profile/:id", authMiddleware, validateRequest(userIdSchema), userController.updateUser)

// Удаление пользователя по ID (админ)
router.delete("/:id", authMiddleware, adminMiddleware, validateRequest(userIdSchema), userController.deleteUser)

// Блокировка пользователя по ID (админ)
router.post("/block/:id", authMiddleware, adminMiddleware, validateRequest(userIdSchema), userController.blockUser)

// Разблокировка пользователя по ID (админ)
router.post("/unblock/:id", authMiddleware, adminMiddleware, validateRequest(userIdSchema), userController.unblockUser)

export const userRoutes = router
