import testController from "@/controllers/test.controller"
import { adminMiddleware, authMiddleware } from "@/middleware/auth.middleware"
import validateRequest from "@/middleware/validate-request.middleware"
import { IAnswer } from "@/types/test.types"
import { Router } from "express"
import { body } from "express-validator"

const router = Router()

router.post(
    "/create",
    authMiddleware,
    [
        body("title")
            .notEmpty()
            .withMessage("Название теста обязательно")
            .isLength({ max: 255 })
            .withMessage("Название теста должно быть не длиннее 255 символов"),
        body("description")
            .optional()
            .isString()
            .withMessage("Описание должно быть строкой")
            .isLength({ max: 1000 })
            .withMessage("Описание должно быть не длиннее 1000 символов"),
    ],
    validateRequest,
    testController.createTest
)

// Добавление вопросов к тесту
router.put(
    "/:testId/questions",
    authMiddleware,
    [
        body("questions").isArray({ min: 1 }).withMessage("Должен быть хотя бы один вопрос"),
        body("questions.*.text")
            .notEmpty()
            .withMessage("Текст вопроса обязателен")
            .isLength({ max: 500 })
            .withMessage("Текст вопроса должен быть не длиннее 500 символов"),
        body("questions.*.answers")
            .isArray({ min: 1 })
            .withMessage("Должен быть хотя бы один ответ")
            .custom((answers: IAnswer[]) => answers.some(a => a.isCorrect === true))
            .withMessage("Хотя бы один ответ должен быть правильным"),
        body("questions.*.answers.*.text")
            .notEmpty()
            .withMessage("Текст ответа обязателен")
            .isLength({ max: 255 })
            .withMessage("Текст ответа должен быть не длиннее 255 символов"),
        body("questions.*.answers.*.isCorrect").isBoolean().withMessage("Поле isCorrect должно быть булевым"),
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
router.get("/all-tests", authMiddleware, adminMiddleware, testController.getAllTests)


// Получение теста по ID
router.get("/:testId", authMiddleware, testController.getTestById);

// Получение всех вопросов теста
router.get("/:testId/questions", authMiddleware, testController.getTestQuestions);

// Получение всех ответов вопроса
router.get("/questions/:questionId/answers", authMiddleware, testController.getQuestionAnswers);


// Обновление вопроса
router.put(
    "/questions/:questionId",
    authMiddleware,
    [
        body("text")
            .notEmpty()
            .withMessage("Текст вопроса обязателен")
            .isLength({ max: 500 })
            .withMessage("Текст вопроса должен быть не длиннее 500 символов"),
        body("answers")
            .isArray({ min: 1 })
            .withMessage("Должен быть хотя бы один ответ")
            .custom((answers: IAnswer[]) => answers.some(a => a.isCorrect === true))
            .withMessage("Хотя бы один ответ должен быть правильным"),
        body("answers.*.text")
            .notEmpty()
            .withMessage("Текст ответа обязателен")
            .isLength({ max: 255 })
            .withMessage("Текст ответа должен быть не длиннее 255 символов"),
        body("answers.*.isCorrect").isBoolean().withMessage("Поле isCorrect должно быть булевым"),
    ],
    validateRequest,
    testController.updateQuestion
)

export default router
