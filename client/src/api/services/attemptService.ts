import axiosInstance from "@/api"
import { AttemptsListDTO, TestAttemptDTO } from "@/shared/types/testTypes"
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
}

export const attemptService = new AttemptService()
