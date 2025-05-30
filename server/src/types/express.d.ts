import { AnswerDTO, QuestionDTO, TestDTO, UserDTO } from "@/types"
import "express"
declare module "express" {
	interface Request {
		user?: UserDTO
		test?: TestDTO
		question?: QuestionDTO
		answer?: AnswerDTO
	}
}
