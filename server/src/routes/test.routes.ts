// routes/test.routes.ts
import testController from "@/controllers/test.controller"
import { adminMiddleware, authMiddleware } from "@/middleware/auth.middleware"
import validateRequest from "@/middleware/validate-request.middleware"
import { Router } from "express"
import { body } from "express-validator"

const router = Router()

// Создание теста (только заголовок)
router.post(
    "/create",
    authMiddleware,
    [body("title").notEmpty().withMessage("Название теста обязательно"), body("description").optional().isString()],
    validateRequest,
    testController.createTest
)

// Добавление вопросов к тесту
router.put(
    "/:testId/questions",
    authMiddleware,
    [
        body("questions").isArray({ min: 1 }).withMessage("Должен быть хотя бы один вопрос"),
        body("questions.*.text").notEmpty().withMessage("Текст вопроса обязателен"),
        body("questions.*.answers")
            .isArray({ min: 1 })
            .withMessage("Должен быть хотя бы один ответ")
            .custom((answers: any[]) => answers.some(a => a.isCorrect === true))
            .withMessage("Хотя бы один ответ должен быть правильным"),
    ],
    validateRequest,
    testController.updateTest
)
router.get("/user-tests", authMiddleware, testController.getUserTests)
router.get("/all-tests", authMiddleware, adminMiddleware, testController.getUserTests)

export default router
