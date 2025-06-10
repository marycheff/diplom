import { isValidUUID } from "@/utils/validator"
import { z } from "zod"

export const userIdSchema = z.object({
	params: z.object({
		userId: z.string().min(1, "ID пользователя обязательно").refine(isValidUUID, {
			message: "Некорректный ID пользователя",
		}),
	}),
})
