import userController from "@/controllers/user.controller"
import { adminMiddleware, authMiddleware } from "@/middleware/auth.middleware"
import { Router } from "express"

const router = Router()

// Получение списка всех пользователей (админ)
router.get("/", authMiddleware, adminMiddleware, userController.getUsers)

// Получение информации о пользователе по его ID
router.get("/:id", authMiddleware, userController.getUserById)

// Обновление данных пользователя по ID
router.put("/update-profile/:id", authMiddleware, userController.updateUser)

// Удаление пользователя по ID (админ)
router.delete("/:id", authMiddleware, adminMiddleware, userController.deleteUser)

// Блокировка пользователя по ID (админ)
router.post("/block/:id", authMiddleware, adminMiddleware, userController.blockUser)

// Разблокировка пользователя по ID (админ)
router.post("/unblock/:id", authMiddleware, adminMiddleware, userController.unblockUser)

export default router
