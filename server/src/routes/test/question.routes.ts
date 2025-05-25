import { questionController } from "@/controllers"
import { authMiddleware, testOwnershipMiddleware, validateRequest } from "@/middleware"
import { upsertQuestionsSchema } from "@/schemas/test.schema"
import express from "express"
import multer from "multer"
import path from "path"

// Настройка multer для загрузки изображений
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/questions")
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname))
    },
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"]
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error("Неподдерживаемый формат файла"))
        }
    },
})

const router = express.Router()

/* =================================
    Управление вопросами теста
  ================================= */

// Добавление вопросов к тесту
router.put(
    "/:testId/questions-upsert",
    authMiddleware,
    testOwnershipMiddleware,
    validateRequest(upsertQuestionsSchema),
    questionController.upsertQuestions
)

// Загрузка изображения для вопроса
// router.post(
//     "/:testId/questions/:questionId/image",
//     authMiddleware,
//     testOwnershipMiddleware,
//     upload.single("image"),
//     questionController.uploadQuestionImage
// )

// Получение изображения вопроса
// router.get("/questions/images/:filename", questionController.getQuestionImage)

export const questionRoutes = router
