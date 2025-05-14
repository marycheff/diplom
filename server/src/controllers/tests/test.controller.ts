import ApiError from "@/exceptions/api-error"
import testService from "@/services/tests/test.service"
import { CreateTest, ShortTestInfo, TestSettingsDTO } from "@/types"
import { ModerationStatus, TestVisibilityStatus } from "@prisma/client"

import { NextFunction, Request, Response } from "express"

class TestController {
    // Создание пустого теста
    async createTest(req: Request, res: Response, next: NextFunction) {
        try {
            const authorId = req.user?.id
            const testData: CreateTest = req.body
            if (!authorId) {
                throw ApiError.Unauthorized()
            }
            const createdTest = await testService.createTest(authorId, testData)
            res.status(201).json(createdTest)
        } catch (error) {
            next(error)
        }
    }

    // async updateTestQuestions(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const { testId } = req.params
    //         const questions: QuestionDTO[] = req.body

    //         await testService.updateTestQuestions(testId, questions)

    //         res.status(200)
    //     } catch (error) {
    //         next(error)
    //     }
    // }
    async updateTestSettings(req: Request, res: Response, next: NextFunction) {
        try {
            const testId = req.test?.id
            const settings: TestSettingsDTO = req.body
            if (settings.timeLimit !== undefined && settings.timeLimit !== null && settings.timeLimit < 0) {
                throw ApiError.BadRequest("Лимит времени должен быть положительным числом или null")
            }
            await testService.updateTestSettings(testId!, settings)
            res.status(200).json({ message: "Настройки теста успешно изменены" })
        } catch (error) {
            next(error)
        }
    }
    async getMyTests(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id
            if (!userId) {
                throw ApiError.Unauthorized()
            }
            const page = parseInt(req.query.page as string) || 1
            const limit = parseInt(req.query.limit as string) || 10

            if (page < 1 || limit < 1) {
                throw ApiError.BadRequest("Страница и лимит должны быть положительными числами")
            }
            const tests = await testService.getMyTests(userId, page, limit)
            res.json(tests)
        } catch (error) {
            next(error)
        }
    }
    async getAllTests(req: Request, res: Response, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string) || 1
            const limit = parseInt(req.query.limit as string) || 10

            if (page < 1 || limit < 1) {
                throw ApiError.BadRequest("Страница и лимит должны быть положительными числами")
            }
            const tests = await testService.getAllTests(page, limit)
            res.json(tests)
        } catch (error) {
            next(error)
        }
    }
    async getAllUnmoderatedTests(req: Request, res: Response, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string) || 1
            const limit = parseInt(req.query.limit as string) || 10

            if (page < 1 || limit < 1) {
                throw ApiError.BadRequest("Страница и лимит должны быть положительными числами")
            }
            const tests = await testService.getAllUnmoderatedTests(page, limit)
            res.json(tests)
        } catch (error) {
            next(error)
        }
    }

    async deleteTest(req: Request, res: Response, next: NextFunction) {
        try {
            const { testId } = req.params
            await testService.deleteTest(testId)
            res.status(200).json({ message: "Тест успешно удален" })
        } catch (error) {
            next(error)
        }
    }

    async getTestById(req: Request, res: Response, next: NextFunction) {
        try {
            const test = req.test
            res.status(200).json(test)
        } catch (error) {
            next(error)
        }
    }
    async getTestByIdForUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { testId } = req.params
            const attemptId = req.query.attemptId as string
            const test = await testService.getTestForUserById(testId, attemptId)
            res.status(200).json(test)
        } catch (error) {
            next(error)
        }
    }
    async searchTests(req: Request, res: Response, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string) || 1
            const limit = parseInt(req.query.limit as string) || 10
            const query = req.query.query as string

            if (page < 1 || limit < 1) {
                throw ApiError.BadRequest("Страница и лимит должны быть положительными числами")
            }

            if (!query) {
                throw ApiError.BadRequest("Нет поискового запроса")
            }

            const tests = await testService.searchTests(query, page, limit)
            res.json(tests)
        } catch (e) {
            next(e)
        }
    }

    async searchMyTests(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id
            if (!userId) {
                throw ApiError.Unauthorized()
            }
            const page = parseInt(req.query.page as string) || 1
            const limit = parseInt(req.query.limit as string) || 10
            const query = req.query.query as string

            if (page < 1 || limit < 1) {
                throw ApiError.BadRequest("Страница и лимит должны быть положительными числами")
            }

            if (!query) {
                throw ApiError.BadRequest("Нет поискового запроса")
            }

            const tests = await testService.searchUserTests(query, userId, page, limit)
            res.json(tests)
        } catch (e) {
            next(e)
        }
    }
    async updateShortInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const { testId } = req.params
            const updatedShortInfo: ShortTestInfo = req.body
            await testService.updateShortInfo(testId, updatedShortInfo)
            res.status(200).json({ message: "Информация о тесте обновлена" })
        } catch (e) {
            next(e)
        }
    }

    async getTestSnapshot(req: Request, res: Response, next: NextFunction) {
        try {
            const { snapshotId } = req.params
            const snapshot = await testService.getTestSnapshot(snapshotId)
            res.json(snapshot)
        } catch (error) {
            next(error)
        }
    }
    async changeVisibilityStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const { testId } = req.params
            const { status } = req.body
            const testVisibilityStatus = req.test?.visibilityStatus
            if (!status) {
                throw ApiError.BadRequest("Статус видимости теста не был передан")
            }
            if (testVisibilityStatus === status) {
                throw ApiError.BadRequest("Статус видимости теста не изменился")
            }

            if (!Object.values(TestVisibilityStatus).includes(status)) {
                throw ApiError.BadRequest("Некорректный статус видимости")
            }

            await testService.changeVisibilityStatus(testId, status)
            res.status(200).json({ message: "Статус видимости теста успешно изменен" })
        } catch (error) {
            next(error)
        }
    }
    async changeModerationStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const { testId } = req.params
            const { status } = req.body
            const testModerationStatus = req.test?.moderationStatus
            if (!status) {
                throw ApiError.BadRequest("Статус модерации теста не был передан")
            }
            if (testModerationStatus === status) {
                throw ApiError.BadRequest("Статус модерации теста не изменился")
            }

            if (!Object.values(ModerationStatus).includes(status)) {
                throw ApiError.BadRequest("Некорректный статус модерации")
            }
            const userId = req.user?.id
            if (!userId) {
                throw ApiError.Unauthorized()
            }

            await testService.changeModerationStatus(testId, status, userId)
            res.status(200).json({ message: "Статус модерации теста успешно изменен" })
        } catch (error) {
            next(error)
        }
    }
}

export default new TestController()
