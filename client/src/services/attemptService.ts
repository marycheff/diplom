import axiosInstance from "@/axios"
import { AttemptsListDTO } from "@/types/testTypes"
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
}

export const attemptService = new AttemptService()
