import axiosInstance from "@/axios/axios"
import { TestDTO } from "@/types/testTypes"
import { AxiosResponse } from "axios"

class TestService {
    getTests(): Promise<AxiosResponse<TestDTO[]>> {
        return axiosInstance.get<TestDTO[]>("/test/all-tests")
    }
}
export const testService = new TestService()
