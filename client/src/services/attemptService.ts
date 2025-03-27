
import axiosInstance from "@/axios"
import { AttemptsListDTO, TestAttemptDTO } from "@/types/testTypes"
import { AxiosResponse } from "axios"

class AttemptService {
    getTestAttempts(testId: string, page = 1, limit = 10): Promise<AxiosResponse<AttemptsListDTO>> {
        return axiosInstance.get<AttemptsListDTO>(`/test/${testId}/attempts`, {
            params: {
                page,
                limit,
            },
        })
    }
    getAttemptById(id: string): Promise<AxiosResponse<TestAttemptDTO>>{
        return axiosInstance.get<TestAttemptDTO>(`/test/attempts/${id}`)
    }
}

export const attemptService = new AttemptService()
