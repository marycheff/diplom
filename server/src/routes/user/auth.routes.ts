import { authController, passwordResetController, userController } from "@/controllers"
import { authMiddleware, validateRequest } from "@/middleware"
import {
	loginSchema,
	registrationSchema,
	resetPasswordRequestSchema,
	resetPasswordSchema,
	updateActivationLinkSchema,
	updatePasswordSchema,
	verifyResetCodeSchema
} from "@/schemas/auth.schema"
import express from "express"

const router = express.Router()

// Регистрация нового пользователя
router.post("/registration", validateRequest(registrationSchema), authController.register)

// Активация аккаунта по ссылке
router.get("/activate/:link", authController.activate)

// Вход в систему
router.post("/login", validateRequest(loginSchema), authController.login)

// Выход из системы
router.post("/logout", authMiddleware, authController.logout)

// Обновление токена доступа
router.get("/refresh", authController.refresh)

// Отправка новой ссылки для активации аккаунта
router.post(
	"/send-update-activation-link",
	authMiddleware,
	validateRequest(updateActivationLinkSchema),
	authController.updateActivationLink
)

// Запрос на сброс пароля
router.post(
	"/reset-password-request",
	validateRequest(resetPasswordRequestSchema),
	passwordResetController.requestReset
)

// Проверка кода сброса пароля
router.post("/verify-reset-code", validateRequest(verifyResetCodeSchema), passwordResetController.verifyResetCode)

// Сброс пароля
router.post("/reset-password", validateRequest(resetPasswordSchema), passwordResetController.resetPassword)

// Обновление пароля
router.post("/update-password", authMiddleware, validateRequest(updatePasswordSchema), userController.updatePassword)

export const authRoutes = router
