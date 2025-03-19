import axiosInstance from "@/axios"
import { TestsListDTO } from "@/types/testTypes"
import { AxiosResponse } from "axios"

class TestService {
    getTests(page: number = 1, limit: number = 10): Promise<AxiosResponse<TestsListDTO>> {
        return axiosInstance.get<TestsListDTO>("/test/all-tests", {
            params: {
                page,
                limit,
            },
        })
    }
}
export const testService = new TestService()
