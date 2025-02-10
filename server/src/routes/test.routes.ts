import testController from "@/controllers/test.controller"
import { adminMiddleware, authMiddleware } from "@/middleware/auth.middleware"
import validateRequest from "@/middleware/validate-request.middleware"
import { IAnswer } from "@/types/test.types"
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
            .custom((answers: IAnswer[]) => answers.some(a => a.isCorrect === true))
            .withMessage("Хотя бы один ответ должен быть правильным"),
    ],
    validateRequest,
    testController.updateTest
)

// Удаление теста
router.delete("/:testId", authMiddleware, validateRequest, testController.deleteTest)

// Удаление вопроса из теста
router.delete("/questions/:questionId", authMiddleware, validateRequest, testController.deleteQuestion)

// Удаление всех вопросов из теста
router.delete("/:testId/questions", authMiddleware, validateRequest, testController.deleteAllQuestions)

// Удаление ответа из вопроса
router.delete("/answers/:answerId", authMiddleware, validateRequest, testController.deleteAnswer)

// Получение всех тестов пользователя (только свои)
router.get("/user-tests", authMiddleware, testController.getUserTests)

// Получение всех тестов (админ)
router.get("/all-tests", authMiddleware, adminMiddleware, testController.getUserTests)

// Обновление вопроса
router.put(
    "/questions/:questionId",
    authMiddleware,
    [
        body("text").notEmpty().withMessage("Текст вопроса обязателен"),
        body("answers").isArray({ min: 1 }).withMessage("Должен быть хотя бы один ответ"),
        body("answers.*.text").notEmpty().withMessage("Текст ответа обязателен"),
        body("answers.*.isCorrect").isBoolean().withMessage("Поле isCorrect должно быть булевым"),
        body("answers")
            .isArray({ min: 1 })
            .withMessage("Должен быть хотя бы один ответ")
            .custom((answers: IAnswer[]) => answers.some(a => a.isCorrect === true))
            .withMessage("Хотя бы один ответ должен быть правильным"),
    ],
    validateRequest,
    testController.updateQuestion
)

export default router
