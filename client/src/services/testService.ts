import axiosInstance from "@/axios"
import { TestsListDTO } from "@/types/testTypes"
import { AxiosResponse } from "axios"

class TestService {
getTests(page = 1, limit = 10): Promise<AxiosResponse<TestsListDTO>> {
        return axiosInstance.get<TestsListDTO>("/test/all-tests", {
            params: {
                page,
                limit,
            },
        })
    }

    searchTest(query: string, page = 1, limit = 10): Promise<AxiosResponse<TestsListDTO>> {
        return axiosInstance.get<TestsListDTO>("/test/search", {
            params: {
                query,
                page,
                limit,
            },
        })
    }
}
export const testService = new TestService()
