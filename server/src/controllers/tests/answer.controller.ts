import answerService from "@/services/tests/answer.service"
import { NextFunction, Request, Response } from "express"
class AnswerController {
    async getQuestionAnswers(req: Request, res: Response, next: NextFunction) {
        try {
            const { questionId } = req.params
            const answers = await answerService.getQuestionAnswers(questionId)
            res.json(answers)
        } catch (error) {
            next(error)
        }
    }
    async deleteAnswer(req: Request, res: Response, next: NextFunction) {
        try {
            const answer = req.answer
            if (answer) await answerService.deleteAnswer(answer)
            res.status(200).json({ message: "Ответ успешно удален" })
        } catch (e) {
            next(e)
        }
    }
    async deleteAllAnswers(req: Request, res: Response, next: NextFunction) {
        try {
            const { questionId } = req.params
            await answerService.deleteAllAnswers(questionId)
            res.status(200).json({ message: "Все ответы успешно удалены" })
        } catch (error) {
            next(error)
        }
    }
}
export default new AnswerController()
