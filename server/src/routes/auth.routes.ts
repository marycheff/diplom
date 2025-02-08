import authController from "@/controllers/auth.controller"
import passwordResetController from "@/controllers/password-reset.controller"
import userController from "@/controllers/user.controller"
import { authMiddleware } from "@/middleware/auth.middleware"
import validateRequest from "@/middleware/validate-request.middleware"

import express from "express"
import { body } from "express-validator"

const router = express.Router()

// Регистрация нового пользователя
router.post(
    "/registration",
    [
        // body("email").isEmail().withMessage("Некорректный email"),
        // body("password").isLength({ min: 3, max: 20 }).withMessage("Пароль должен быть от 3 до 20 символов"),
    ],
    validateRequest,
    authController.registration
)

// Активация аккаунта по ссылке
router.get("/activate/:link", authController.activate)

// Вход в систему
router.post(
    "/login",
    //[body("email").isEmail().withMessage("Некорректный email")],
    validateRequest,
    authController.login
)

// Выход из системы
router.post("/logout", authMiddleware, authController.logout)

// Обновление токена доступа
router.get("/refresh", authController.refresh)

// Отправка новой ссылки для активации аккаунта
router.post(
    "/send-update-activation-link",
    authMiddleware,
    [body("email").isEmail().withMessage("Некорректный email")],
    validateRequest,
    authController.updateActivationLink
)

// Запрос на сброс пароля
router.post(
    "/reset-password-request",
    [body("email").isEmail().withMessage("Некорректный email")],
    validateRequest,
    passwordResetController.requestReset
)

// Проверка кода сброса пароля
router.post(
    "/verify-reset-code",
    [body("code").notEmpty().withMessage("Код сброса не может быть пустым")],
    validateRequest,
    passwordResetController.verifyResetCode
)

// Сброс пароля
router.post(
    "/reset-password",
    [
        body("code").notEmpty().withMessage("Код сброса не может быть пустым"),
        body("newPassword").isLength({ min: 3 }).withMessage("Новый пароль должен содержать не менее 3 символов"),
    ],
    validateRequest,
    passwordResetController.resetPassword
)

// Обновление пароля пользователем
router.post(
    "/update-password",
    authMiddleware,
    [
        // body("email").isEmail().withMessage("Некорректный email"),
        body("newPassword").isLength({ min: 3 }).withMessage("Новый пароль должен содержать не менее 3 символов"),
    ],
    validateRequest,
    userController.updatePassword
)

export default router
