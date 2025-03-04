import { Router } from "express"

import { authMiddleware, adminMiddleware } from "@/middleware/auth.middleware"
import badWordsController from "@/controllers/bad-words.controller"

const router = Router()

// Добавление слова
router.post("/", authMiddleware, adminMiddleware, badWordsController.addBadWord)

// Проверка слова
router.post("/check/:text", authMiddleware, adminMiddleware, badWordsController.isProfane)

// Удаление слова
router.delete("/:word", authMiddleware, adminMiddleware, badWordsController.removeBadWord)

export default router
