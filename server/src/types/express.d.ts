import { UserDTO } from "@/dtos/user.dto"
import { AnswerDTO, QuestionDTO, TestDTO } from "@/types/test.types"
import "express"

declare module "express" {
    interface Request {
        user?: UserDTO
        test?: TestDTO
        question?: QuestionDTO
        answer?: AnswerDTO
    }
}
