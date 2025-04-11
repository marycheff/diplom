import { mapUserToDto } from "@/services/mappers/user.mappers"
import {
    AnswerDTO,
    AttemptQuestionDTO,
    QuestionDTO,
    TestAttemptDTO,
    TestDTO,
    TestSettingsDTO,
} from "@/types/test.types"
import { Answer, Question, Test, TestAttempt, User, UserAnswer } from "@prisma/client"

export const mapToResponseAnswer = (answer: Answer): AnswerDTO => {
    return {
        id: answer.id,
        text: answer.text,
        isCorrect: answer.isCorrect,
    }
}
export const mapToResponseQuestion = (question: Question & { answers?: Answer[] }): QuestionDTO => {
    return {
        id: question.id,
        text: question.text,
        order: question.order,
        type: question.type,
        answers: question.answers?.map(answer => mapToResponseAnswer(answer)) || [],
    }
}

export const mapToResponseTest = (
    test: Test & {
        settings?: TestSettingsDTO | null
        questions?: (Question & { answers: Answer[] })[]
        author: {
            id: string
            email: string
            name?: string | null
            surname?: string | null
            patronymic?: string | null
        }
    }
): TestDTO => {
    return {
        id: test.id,
        author: {
            id: test.author.id,
            email: test.author.email,
            name: test.author.name,
            surname: test.author.surname,
            patronymic: test.author.patronymic,
        },
        title: test.title,
        description: test.description || "",
        totalAttempts: test.totalAttempts,
        settings: test.settings
            ? {
                  requireRegistration: test.settings.requireRegistration,
                  inputFields: test.settings.inputFields,
                  shuffleAnswers: test.settings.shuffleAnswers,
                  shuffleQuestions: test.settings.shuffleQuestions,
                  showDetailedResults: test.settings.showDetailedResults,
                  timeLimit: test.settings.timeLimit,
              }
            : {},
        questions: test.questions?.map(question => mapToResponseQuestion(question)) || [],
    }
}
export const mapToAttemptQuestionDTO = (
    question: Question & { answers: Answer[] },
    userAnswers: UserAnswer[],
    allAnswers: Answer[]
): AttemptQuestionDTO => {
    const userAnswer = userAnswers.find(a => a.questionId === question.id)
    const answer = userAnswer?.answerId ? allAnswers.find(a => a.id === userAnswer.answerId) : null

    return {
        question: {
            id: question.id,
            text: question.text,
            order: question.order,
            type: question.type,
        },
        answers: question.answers.map(mapToResponseAnswer),
        userAnswer:
            userAnswer && answer
                ? {
                      userAnswerId: userAnswer.id, // ID из UserAnswer
                      answer: mapToResponseAnswer(answer),
                      timeSpent: userAnswer.timeSpent,
                      answeredAt: userAnswer.answeredAt,
                      createdAt: userAnswer.createdAt,
                  }
                : null,
    }
}
export const mapToTestAttemptDTO = (
    attempt: TestAttempt & {
        test: Test & {
            questions: (Question & { answers: Answer[] })[]
            author: {
                id: string
                email: string
                name?: string | null
                surname?: string | null
                patronymic?: string | null
            }
        }
        user: User | null
        answers: UserAnswer[]
    }
): TestAttemptDTO => {
    const allAnswers = attempt.test.questions.flatMap(q => q.answers)

    return {
        id: attempt.id,
        status: attempt.status,
        startedAt: attempt.startedAt,
        completedAt: attempt.completedAt ?? null,
        score: attempt.score ?? null,
        snapshotId: attempt.snapshotId ?? "",
        user: attempt.user ? mapUserToDto(attempt.user) : attempt.userData,
        test: mapToResponseTest(attempt.test),
        questions: attempt.test.questions.map(q => mapToAttemptQuestionDTO(q, attempt.answers, allAnswers)),
    }
}
