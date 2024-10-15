import { Router } from "express"
import { body } from "express-validator"
import UserController from "../controllers/user-controller"
import { authMiddleware } from "../middleware/auth-middleware"
import validateRequest from "../middleware/validate-request" // Для обработки ошибок валидации

const router = Router()

// Регистрация с валидацией
router.post(
    "/registration",
    [
        body("email").isEmail().withMessage("Некорректный email"),
        body("password").isLength({ min: 3, max: 32 }).withMessage("Пароль должен быть от 3 до 32 символов"),
    ],
    validateRequest,
    UserController.registration
)

router.post(
    "/update-password",
    authMiddleware,
    body("email").isEmail().withMessage("Некорректный email"),
    [body("newPassword").isLength({ min: 3 }).withMessage("Новый пароль должен содержать не менее 3 символов")],
    validateRequest,
    UserController.updatePassword
)

router.post(
    "/login",
    [
        /* 
        пока убрал из-за email 1 pass 1
        body("email").isEmail().withMessage("Некорректный email"),
        */
    ],
    UserController.login
)
router.post("/logout", UserController.logout)
router.get("/activate/:link", UserController.activate)
router.get("/refresh", UserController.refresh)
router.get("/users", authMiddleware, UserController.getUsers)
// router.post("/send-reset-code", UserController.sendResetCode)
// router.post("/verify-reset-code", UserController.verifyResetCode)
// router.post("/reset-password", UserController.resetPassword)

export default router
