import axiosInstance from "@/api"
import {
    AttemptAnswer,
    AttemptsListDTO,
    CompleteAttemptResponse,
    StartAttemptDTO,
    TestAttemptDTO,
    TestAttemptUserDTO,
} from "@/shared/types"
import { AxiosResponse } from "axios"

class AttemptService {
    getTestAttempts(testId: string, page = 1, limit = 10): Promise<AxiosResponse<AttemptsListDTO>> {
        return axiosInstance.get<AttemptsListDTO>(`/tests/${testId}/attempts`, {
            params: {
                page,
                limit,
            },
        })
    }
    getAttemptById(id: string): Promise<AxiosResponse<TestAttemptDTO>> {
        return axiosInstance.get<TestAttemptDTO>(`/tests/attempts/${id}`)
    }
    getAttemptForUserById(id: string): Promise<AxiosResponse<TestAttemptUserDTO>> {
        return axiosInstance.get<TestAttemptUserDTO>(`/tests/attempts/${id}/for-user`)
    }
    getAllAttempts(page = 1, limit = 10): Promise<AxiosResponse<AttemptsListDTO>> {
        return axiosInstance.get<AttemptsListDTO>("/tests/attempts/all", {
            params: {
                page,
                limit,
            },
        })
    }
    // TODO: исправить any
    startTestAttempt(testId: string, userData?: any): Promise<AxiosResponse<StartAttemptDTO>> {
        return axiosInstance.post<StartAttemptDTO>(`/tests/${testId}/start`, {
            userData,
        })
    }
    saveAnswers(attemptId: string, answers: AttemptAnswer[]): Promise<AxiosResponse<void>> {
        return axiosInstance.post<void>(`/tests/attempts/${attemptId}/answers`, {
            answers,
        })
    }
    completeAttempt(attemptId: string): Promise<AxiosResponse<CompleteAttemptResponse>> {
        return axiosInstance.post<CompleteAttemptResponse>(`/tests/attempts/${attemptId}/complete`)
    }
}

export const attemptService = new AttemptService()
