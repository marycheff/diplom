import axiosInstance from "@/http/axios"
import { TestDTO } from "@/types/test.types"
import { AxiosResponse } from "axios"

class TestService {
    getTests(): Promise<AxiosResponse<TestDTO[]>> {
        return axiosInstance.get<TestDTO[]>("/test/all-tests")
    }
}
export const testService = new TestService()
