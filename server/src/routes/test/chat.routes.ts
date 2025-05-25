import { gigaChatController } from "@/controllers"
import { authMiddleware, validateRequest } from "@/middleware"
import { generateAnswersSchema, generateTestSchema } from "@/schemas/gigachat.schema"
import { Router } from "express"

const router = Router()

router.post(
    "/generate-answers",
    authMiddleware,
    validateRequest(generateAnswersSchema),
    gigaChatController.generateAnswers
)
router.post("/generate-test", authMiddleware, validateRequest(generateTestSchema), gigaChatController.generateTest)

export const chatRoutes = router
