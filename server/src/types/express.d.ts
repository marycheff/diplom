import { UserDto } from "@/dtos/user.dto"
import { IQuestion, ITest, ITestResponse } from "@/types/test.types"
import "express"

declare module "express" {
    interface Request {
        user?: UserDto
        test?: ITestResponse
        question?: IQuestion
    }
}
