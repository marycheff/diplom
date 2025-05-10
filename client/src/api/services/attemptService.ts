import axiosInstance from "@/api"
import {
    AttemptAnswer,
    AttemptsListDTO,
    AttemptsWithSnapshotListDTO,
    CompleteAttemptResponse,
    PreTestUserDataType,
    StartAttemptDTO,
    TestAttemptDTO,
    TestAttemptResultDTO,
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
    getAttemptResultsById(id: string): Promise<AxiosResponse<TestAttemptResultDTO>> {
        return axiosInstance.get<TestAttemptResultDTO>(`/tests/attempts/${id}/results`)
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
    startTestAttempt(testId: string, preTestUserData?: PreTestUserDataType): Promise<AxiosResponse<StartAttemptDTO>> {
        return axiosInstance.post<StartAttemptDTO>(`/tests/${testId}/start`, {
            userData: preTestUserData,
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
    getMyAttempts(page = 1, limit = 10): Promise<AxiosResponse<AttemptsWithSnapshotListDTO>> {
        return axiosInstance.get<AttemptsWithSnapshotListDTO>("/tests/attempts/my-attempts", {
            params: {
                page,
                limit,
            },
        })
    }
}

export const attemptService = new AttemptService()
