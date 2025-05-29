import { questionService } from "@/services"
import { emitQuestionsUpdated } from "@/sockets"
import { NextFunction, Request, Response } from "express"
class QuestionController {
    // Обновление или создание вопросов
    async upsertQuestions(req: Request, res: Response, next: NextFunction) {
        try {
            const { testId } = req.params
            const questions = req.body.questions

            const updatedQuestions = await questionService.upsertQuestions(testId, questions)
            emitQuestionsUpdated(testId)
            res.status(200).json({
                message: "Вопросы успешно обновлены",
                questions: updatedQuestions,
            })
        } catch (error) {
            next(error)
        }
    }
}
export const questionController = new QuestionController()
