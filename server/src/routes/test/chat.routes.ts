import { gigaChatController } from "@/controllers"
import { accountActivationMiddleware, authMiddleware, validateRequest } from "@/middleware"
import { generateAnswersSchema, generateTestSchema } from "@/schemas/gigachat.schema"
import { Router } from "express"

const router = Router()

router.post(
	"/generate-answers",
	authMiddleware,
	accountActivationMiddleware,
	validateRequest(generateAnswersSchema),
	gigaChatController.generateAnswers
)
router.post(
	"/generate-test",
	authMiddleware,
	accountActivationMiddleware,
	validateRequest(generateTestSchema),
	gigaChatController.generateTest
)

export const chatRoutes = router
