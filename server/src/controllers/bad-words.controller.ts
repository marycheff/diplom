import ApiError from "@/exceptions/api-error"
import badWordsService from "@/services/bad-words.service"
import { NextFunction, Request, Response } from "express"

class BadWordsController {
    async addBadWord(req: Request, res: Response, next: NextFunction) {
        try {
            const { word } = req.body
            const addedBy = req.user?.id
            if (!addedBy) {
                throw ApiError.Unauthorized()
            }
            await badWordsService.addBadWord(word, addedBy)
            res.status(201).json({ message: "Слово успешно добавлено" })
        } catch (e) {
            next(e)
        }
    }

    async removeBadWord(req: Request, res: Response, next: NextFunction) {
        try {
            const { word } = req.params
            await badWordsService.removeBadWord(word)
            res.status(204).send()
        } catch (e) {
            next(e)
        }
    }

    async isProfane(req: Request, res: Response, next: NextFunction) {
        try {
            const { text } = req.params
            const isProfane = badWordsService.isProfane(text)
            res.json({ isProfane })
        } catch (error) {
            next(error)
        }
    }
}

export default new BadWordsController()
