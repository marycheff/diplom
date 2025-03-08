import { UserDto } from "@/dtos/user.dto"
import { IAnswer, IAnswerResponse, IQuestionResponse, ITestResponse } from "@/types/test.types"
import "express"

declare module "express" {
    interface Request {
        user?: UserDto
        test?: ITestResponse
        question?: IQuestionResponse
        answer?: IAnswer
    }
}
