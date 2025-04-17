import ApiError from "@/exceptions/api-error"
import questionRepository from "@/repositories/tests/question.repository"
import testRepository from "@/repositories/tests/test.repository"
import { mapQuestion, mapTest } from "@/services/mappers/test.mappers"
import { QuestionDTO, TestDTO } from "@/types/test.types"

class QuestionService {
    async getTestQuestions(testId: string): Promise<QuestionDTO[]> {
        const questions = await questionRepository.findManyByTestId(testId)
        return questions.map(q => ({
            id: q.id,
            text: q.text,
            order: q.order,
            type: q.type,
            answers: q.answers.map(a => ({
                id: a.id,
                text: a.text,
                isCorrect: a.isCorrect,
            })),
        }))
    }

    async isQuestionBelongsToTest(questionId: string, testId: string): Promise<boolean> {
        try {
            const question = await questionRepository.findByIdWithTestId(questionId)
            if (!question) {
                throw ApiError.NotFound("Вопрос не найден")
            }
            return question.testId === testId
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            console.error(error)
            throw ApiError.InternalError("Ошибка при выполнении метода isQuestionBelongsToTest")
        }
    }

    async isQuestionBelongsToAnyTest(
        questionId: string
    ): Promise<{ question: QuestionDTO | null; test: TestDTO | null; belongsToTest: boolean }> {
        try {
            const question = await questionRepository.findByIdWithDetails(questionId)

            if (!question) {
                return { question: null, test: null, belongsToTest: false }
            }

            if (!question.test) {
                return {
                    question: mapQuestion(question),
                    test: null,
                    belongsToTest: false,
                }
            }

            return {
                question: mapQuestion(question),
                test: mapTest(question.test),
                belongsToTest: true,
            }
        } catch (error) {
            console.error(error)
            throw ApiError.InternalError("Ошибка при выполнении метода isQuestionBelongsToAnyTest")
        }
    }

    async getQuestionById(questionId: string): Promise<QuestionDTO> {
        try {
            const question = await questionRepository.findById(questionId)
            if (!question) {
                throw ApiError.NotFound("Вопрос не найден")
            }
            return mapQuestion(question)
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            console.error(error)
            throw ApiError.InternalError("Ошибка при поиске вопроса")
        }
    }

    async deleteQuestion(questionId: string): Promise<void> {
        try {
            await questionRepository.delete(questionId)
        } catch (error) {
            console.error(error)
            throw ApiError.BadRequest("Ошибка при удалении вопроса")
        }
    }

    async deleteAllQuestions(testId: string): Promise<void> {
        try {
            const test = testRepository.findById(testId)
            if (!test) {
                throw ApiError.BadRequest("Тест не найден")
            }
            await questionRepository.deleteAllByTestId(testId)
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            console.error(error)
            throw ApiError.InternalError("Ошибка при получении снимка")
        }
    }

    async updateQuestion(questionId: string, updateData: QuestionDTO): Promise<void> {
        try {
            const question = await questionRepository.findById(questionId)
            if (!question) {
                throw ApiError.NotFound("Вопрос не найден")
            }
            await questionRepository.update(questionId, updateData)
        } catch (error) {
            console.error(error)
            if (error instanceof ApiError) {
                throw error
            }
            throw ApiError.BadRequest("Ошибка при обновлении вопроса")
        }
    }
}

export default new QuestionService()
