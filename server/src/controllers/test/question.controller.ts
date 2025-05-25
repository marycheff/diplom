import { ApiError } from "@/exceptions"
import { questionService } from "@/services"
import { NextFunction, Request, Response } from "express"
class QuestionController {
    /**
     * Загрузка изображения для вопроса
     */
    // async uploadQuestionImage(req: Request, res: Response) {
    //     const { questionId } = req.params
    //     const file = req.file

    //     if (!file) {
    //         throw ApiError.BadRequest("Изображение не было загружено")
    //     }

    //     await questionService.uploadImage(questionId, file)
    //     res.status(200).json({ message: "Изображение успешно загружено" })
    // }

    /**
     * Получение изображения вопроса
     */
    // async getQuestionImage(req: Request, res: Response) {
    //     const { filename } = req.params
    //     const { path, mimetype } = await questionService.getImage(filename)
    //     res.setHeader("Content-Type", mimetype)
    //     res.sendFile(path)
    // }
    // Обновление или создание вопросов
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
export const questionController = new QuestionController()
