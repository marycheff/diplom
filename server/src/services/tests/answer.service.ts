import ApiError from "@/exceptions/api-error"
import answerRepository from "@/repositories/answer.repository"
import { mapAnswer, mapQuestion, mapTest } from "@/services/mappers/test.mappers"
import { AnswerDTO, QuestionDTO, TestDTO } from "@/types/test.types"
import { Answer, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class AnswerService {
    async getQuestionAnswers(questionId: string): Promise<AnswerDTO[]> {
        try {
            const question = await answerRepository.findAnswersByQuestionId(questionId)
            if (!question) {
                throw ApiError.NotFound("Вопрос не найден")
            }
            return question.answers.map(mapAnswer)
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            console.error(error)
            throw ApiError.InternalError("Ошибка при получении ответов")
        }
    }
    async isAnswerBelongsToAnyTest(answerId: string): Promise<{
        answer: AnswerDTO | null
        question: QuestionDTO | null
        test: TestDTO | null
        belongsToTest: boolean
    }> {
        try {
            const answer = await answerRepository.findAnswerWithDetails(answerId)

            if (!answer) {
                return { answer: null, question: null, test: null, belongsToTest: false }
            }

            if (!answer.question || !answer.question.test) {
                return {
                    answer,
                    question: answer.question ? mapQuestion(answer.question) : null,
                    test: null,
                    belongsToTest: false,
                }
            }

            return {
                answer,
                question: mapQuestion(answer.question),
                test: mapTest(answer.question.test),
                belongsToTest: true,
            }
        } catch (error) {
            console.error(error)
            throw ApiError.InternalError("Ошибка при проверке принадлежности ответа к тесту")
        }
    }

    // Удаление ответа
    async deleteAnswer(answer: Answer): Promise<void> {
        try {
            const correctAnswers = await answerRepository.findCorrectAnswers(answer.questionId)

            if (correctAnswers.length === 1 && correctAnswers[0].id === answer.id) {
                const otherAnswers = await answerRepository.findOtherAnswers(answer.questionId, answer.id)

                if (otherAnswers.length > 0 && otherAnswers.every(a => !a.isCorrect)) {
                    throw ApiError.BadRequest("Нельзя удалить единственный правильный ответ")
                }
            }

            await answerRepository.deleteAnswer(answer.id)
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            console.error(error)
            throw ApiError.BadRequest("Ошибка при удалении ответа")
        }
    }

    // Удаление всех ответов к вопросу
    async deleteAllAnswers(questionId: string): Promise<void> {
        try {
            await answerRepository.deleteAllByQuestionId(questionId)
        } catch (error) {
            console.error(error)
            throw ApiError.BadRequest("Ошибка при удалении ответов")
        }
    }
}
export default new AnswerService()
