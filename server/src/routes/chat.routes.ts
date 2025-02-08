import chatController from "@/controllers/chat.controller"
import { authMiddleware } from "@/middleware/auth.middleware"
import { Router } from "express"

const router = Router()

router.post("/generate-answers", authMiddleware, chatController.generateAnswers)

export default router
