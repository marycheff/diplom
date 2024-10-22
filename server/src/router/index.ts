import chatController from "@modules/giga-chat/controllers/chat-controller"
import passwordResetController from "@modules/user/controllers/password-reset-controller"
import userController from "@modules/user/controllers/user-controller"
import { Router } from "express"
import { body } from "express-validator"
import { adminMiddleware, authMiddleware } from "../middleware/auth-middleware"
import validateRequest from "../middleware/validate-request"
import authController from "../modules/auth/controllers/auth-controller"

const router = Router()

// adminMiddleware
router.get("/users", authMiddleware, adminMiddleware, userController.getUsers)

// authMiddleware
router.get("/user/:id", authMiddleware, userController.getUserById)
router.post(
    "/update-password",
    authMiddleware,
    body("email").isEmail().withMessage("Некорректный email"),
    [body("newPassword").isLength({ min: 3 }).withMessage("Новый пароль должен содержать не менее 3 символов")],
    validateRequest,
    userController.updatePassword
)
router.post(
    "/update-activation-link",
    [body("email").isEmail().withMessage("Некорректный email")],
    validateRequest,
    authMiddleware,
    authController.updateActivationLink
)
router.post("/generate-answers", authMiddleware, chatController.generateAnswers)
router.post("/logout", authMiddleware, authController.logout)




// остальные 
router.post(
    "/login",
    [
        /* 
    пока убрал из-за email 1 pass 1
    body("email").isEmail().withMessage("Некорректный email"),
    */
    ],
    validateRequest,
    authController.login
)

router.get("/activate/:link", authController.activate)
router.get("/refresh", authController.refresh)

router.post(
    "/registration",
    [
        body("email").isEmail().withMessage("Некорректный email"),
        body("password").isLength({ min: 3, max: 32 }).withMessage("Пароль должен быть от 3 до 32 символов"),
    ],
    validateRequest,
    authController.registration
)

router.post(
    "/reset-password-request",
    [body("email").isEmail().withMessage("Некорректный email")],
    validateRequest,
    passwordResetController.requestReset
)

router.post(
    "/reset-password",
    [
        body("code").notEmpty().withMessage("Код сброса не может быть пустым"),
        body("newPassword").isLength({ min: 3 }).withMessage("Новый пароль должен содержать не менее 3 символов"),
    ],
    validateRequest,
    passwordResetController.resetPassword
)
router.post(
    "/verify-reset-code",
    [body("code").notEmpty().withMessage("Код сброса не может быть пустым")],
    validateRequest,
    passwordResetController.verifyResetCode
)

export default router
