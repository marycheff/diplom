import { UserDto } from "@/dtos/user.dto"
import { IAnswer, QuestionDTO, TestDTO } from "@/types/test.types"
import "express"

declare module "express" {
    interface Request {
        user?: UserDto
        test?: TestDTO
        question?: QuestionDTO
        answer?: IAnswer
    }
}
