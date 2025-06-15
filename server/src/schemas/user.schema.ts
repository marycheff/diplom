import { isValidUUID } from "@/utils/validator"
import { z } from "zod"

export const userIdSchema = z.object({
	params: z.object({
		userId: z.string().min(1, "ID пользователя обязательно").refine(isValidUUID, {
			message: "Некорректный ID пользователя",
		}),
	}),
})

export const updateUserSchema = z.object({
	params: z.object({
		userId: z.string().min(1, "ID пользователя обязательно").refine(isValidUUID, {
			message: "Некорректный ID пользователя",
		}),
	}),
	body: z.object({
		name: z.string().min(1, "Имя обязательно").max(32, "Имя не может быть больше 32 символов").optional().nullable(),

		surname: z
			.string()
			.min(1, "Фамилия обязательно")
			.max(32, "Фамилия не может быть больше 32 символов")
			.optional()
			.nullable(),

		patronymic: z
			.string()
			.min(1, "Отчество обязательно")
			.max(32, "Отчество не может быть больше 32 символов")
			.optional()
			.nullable(),
	}),
})
