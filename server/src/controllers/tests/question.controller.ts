import questionService from "@/services/tests/question.service"
import { QuestionDTO } from "@/types/test.types"
import { NextFunction, Request, Response } from "express"
class QuestionController {
    async getQuestionById(req: Request, res: Response, next: NextFunction) {
        try {
            const question = req.question
            res.json(question)
        } catch (error) {
            next(error)
        }
    }

    async deleteAllQuestions(req: Request, res: Response, next: NextFunction) {
        try {
            const { testId } = req.params
            await questionService.deleteAllQuestions(testId)
            res.status(200).json({ message: "Все вопросы успешно удалены" })
        } catch (error) {
            next(error)
        }
    }
    async deleteQuestion(req: Request, res: Response, next: NextFunction) {
        try {
            const { questionId } = req.params
            await questionService.deleteQuestion(questionId)
            res.status(200).json({ message: "Вопрос успешно удален" })
        } catch (error) {
            next(error)
        }
    }
    async updateQuestion(req: Request, res: Response, next: NextFunction) {
        try {
            const { questionId } = req.params
            const updateQuestionData: QuestionDTO = req.body
            await questionService.updateQuestion(questionId, updateQuestionData)
            res.status(200).json({ message: "Ответ успешно обновлен", data: updateQuestionData })
        } catch (error) {
            next(error)
        }
    }

    async getQuestionAnswers(req: Request, res: Response, next: NextFunction) {
        try {
            const { questionId } = req.params
            const answers = await questionService.getQuestionAnswers(questionId)
            res.json(answers)
        } catch (error) {
            next(error)
        }
    }
}
export default new QuestionController()
