import questionService from "@/services/tests/question.service"

import { NextFunction, Request, Response } from "express"
class QuestionController {
    async getTestQuestions(req: Request, res: Response, next: NextFunction) {
        try {
            const { testId } = req.params
            const questions = await questionService.getTestQuestions(testId)
            res.json(questions)
        } catch (error) {
            next(error)
        }
    }
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

    async upsertQuestions(req: Request, res: Response, next: NextFunction) {
        try {
            const { testId } = req.params
            const questions = req.body.questions

            const updatedQuestions = await questionService.upsertQuestions(testId, questions)

            res.status(200).json({
                message: "Вопросы успешно обновлены",
                questions: updatedQuestions,
            })
        } catch (error) {
            next(error)
        }
    }
}
export default new QuestionController()
