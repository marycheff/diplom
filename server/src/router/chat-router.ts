import { Router } from "express"
import ChatController from "../controllers/chat-controller"

const router = Router()

router.post("/generate-answers", ChatController.generateAnswers)

export default router
