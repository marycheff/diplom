import { gigaChatController } from "@/controllers"
import { authMiddleware, validateRequest } from "@/middleware"
import { generateAnswersSchema } from "@/schemas/gigachat.schema"
import { Router } from "express"

const router = Router()

router.post(
    "/generate-answers",
    authMiddleware,
    validateRequest(generateAnswersSchema),
    gigaChatController.generateAnswers
)

export const chatRoutes = router
