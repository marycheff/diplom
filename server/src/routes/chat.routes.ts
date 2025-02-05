import { authMiddleware } from "@/middleware/auth.middleware"
import chatController from "@/controllers/chat.controller"
import { Router } from "express"

const router = Router()

router.post("/generate-answers", authMiddleware, chatController.generateAnswers)

export default router
