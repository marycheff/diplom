import "express"
declare module "express" {
    interface Request {
        user?: UserDto
        test?: TestDTO
        question?: QuestionDTO
        answer?: IAnswer
    }
}
