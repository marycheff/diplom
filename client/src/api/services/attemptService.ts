import axiosInstance from "@/api"
import { AttemptsListDTO, StartAttempt, TestAttemptDTO } from "@/shared/types"
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
    getAllAttempts(page = 1, limit = 10): Promise<AxiosResponse<AttemptsListDTO>> {
        return axiosInstance.get<AttemptsListDTO>("/tests/attempts/all", {
            params: {
                page,
                limit,
            },
        })
    }
    // TODO: исправить any
    startTestAttempt(testId: string, userData?: any): Promise<AxiosResponse<StartAttempt>> {
        return axiosInstance.post<StartAttempt>(`/tests/${testId}/start`, {
            userData,
        })
    }
}

export const attemptService = new AttemptService()
