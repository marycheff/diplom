import { gigaChatController } from "@/controllers/gigachat.controller"
import { authMiddleware } from "@/middleware/auth.middleware"
import { validateRequest } from "@/middleware/validate-request.middleware"
import { generateAnswersSchema } from "@/schemas/gigachat.schema"
import { Router } from "express"

const router = Router()

router.post(
    "/generate-answers",
    authMiddleware,
    validateRequest(generateAnswersSchema),
    gigaChatController.generateAnswers
)

export default router
