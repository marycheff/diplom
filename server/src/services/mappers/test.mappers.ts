import { mapUserToDto } from "@/services/mappers/user.mappers"
import {
    AnswerDTO,
    AttemptQuestionDTO,
    QuestionDTO,
    TestAttemptDTO,
    TestDTO,
    TestSettingsDTO,
    TestSnapshotDTO,
    UserTestDTO,
    UserQuestionDTO,
    UserAnswerDTO,
    AnswerUserDTO
} from "@/types/test.types"
import {
    Answer,
    AnswerSnapshot,
    Question,
    QuestionSnapshot,
    QuestionType,
    Test,
    TestAttempt,
    TestSettingsSnapshot,
    TestSnapshot,
    User,
    UserAnswer,
} from "@prisma/client"

export const mapAnswer = (answer: Answer): AnswerDTO => {
    return {
        id: answer.id,
        text: answer.text,
        isCorrect: answer.isCorrect,
    }
}
export const mapQuestion = (question: Question & { answers?: Answer[] }): QuestionDTO => {
    return {
        id: question.id,
        text: question.text,
        order: question.order,
        type: question.type,
        answers: question.answers?.map(answer => mapAnswer(answer)) || [],
    }
}

export const mapTest = (
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
        questions: test.questions?.map(question => mapQuestion(question)) || [],
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
        answers: question.answers.map(mapAnswer),
        userAnswer:
            userAnswer && answer
                ? {
                      userAnswerId: userAnswer.id, // ID из UserAnswer
                      answer: mapAnswer(answer),
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
        test: mapTest(attempt.test),
        questions: attempt.test.questions.map(q => mapToAttemptQuestionDTO(q, attempt.answers, allAnswers)),
    }
}

export const mapToTestSnapshotDTO = (
    snapshot: TestSnapshot & {
        questions: (QuestionSnapshot & { answers: AnswerSnapshot[] })[]
        settings?: TestSettingsSnapshot | null
    }
): TestSnapshotDTO => {
    return {
        id: snapshot.id,
        testId: snapshot.testId,
        title: snapshot.title,
        description: snapshot.description ?? "",
        status: snapshot.status,
        createdAt: snapshot.createdAt,
        settings: snapshot.settings
            ? {
                  id: snapshot.settings.id,
                  //   snapshotId: snapshot.settings.snapshotId,
                  requireRegistration: snapshot.settings.requireRegistration,
                  inputFields: snapshot.settings.inputFields,
                  showDetailedResults: snapshot.settings.showDetailedResults,
                  shuffleQuestions: snapshot.settings.shuffleQuestions,
                  shuffleAnswers: snapshot.settings.shuffleAnswers,
                  timeLimit: snapshot.settings.timeLimit,
                  createdAt: snapshot.settings.createdAt,
              }
            : undefined,
        questions: snapshot.questions.map(q => ({
            id: q.id,
            // snapshotId: q.snapshotId,
            originalId: q.originalId,
            text: q.text,
            order: q.order,
            type: q.type,
            createdAt: q.createdAt,
            answers: q.answers.map(a => ({
                id: a.id,
                questionId: a.questionId,
                originalId: a.originalId,
                text: a.text,
                isCorrect: a.isCorrect,
                createdAt: a.createdAt,
            })),
        })),
    }
}

export const mapUserTest = (
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
): UserTestDTO => {
    return {
        id: test.id,
        title: test.title,
        description: test.description || "",
        settings: test.settings
            ? {
                  requireRegistration: test.settings.requireRegistration,
                  inputFields: test.settings.inputFields,
                  shuffleAnswers: test.settings.shuffleAnswers,
                  shuffleQuestions: test.settings.shuffleQuestions,
                  timeLimit: test.settings.timeLimit,
              }
            : {},
        questions: test.questions?.map(question => mapUserQuestion(question)) || [],
    }
}

// Вспомогательная функция для маппинга вопросов без информации о правильных ответах
export const mapUserQuestion = (question: Question & { answers: Answer[] }): UserQuestionDTO => {
    return {
        id: question.id,
        text: question.text,
        type: question.type as QuestionType,
        answers: question.answers.map(answer => mapUserAnswer(answer)),
    }
}

// Вспомогательная функция для маппинга ответов без информации о правильности
export const mapUserAnswer = (answer: Answer): AnswerUserDTO => {
    return {
        id: answer.id,
        text: answer.text,
    }
}