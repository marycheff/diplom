import axiosInstance from "@/api"
import { GenerateAnswerFormData, TestDTO, TestSettingsDTO, TestsListDTO, UpdateTestDTO } from "@/shared/types/testTypes"
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

    searchTests(query: string, page = 1, limit = 10): Promise<AxiosResponse<TestsListDTO>> {
        return axiosInstance.get<TestsListDTO>("/test/search", {
            params: {
                query,
                page,
                limit,
            },
        })
    }

    getTestById(id: string): Promise<AxiosResponse<TestDTO>> {
        return axiosInstance.get<TestDTO>(`/test/${id}`)
    }
    getMyTests(page = 1, limit = 10): Promise<AxiosResponse<TestsListDTO>> {
        return axiosInstance.get<TestsListDTO>("/test/my-tests", {
            params: {
                page,
                limit,
            },
        })
    }

    createTest(title: string, description?: string): Promise<AxiosResponse<TestDTO>> {
        return axiosInstance.post<TestDTO>("/test/create", { title, description })
    }
    // testService.ts
    generateAnswers = (data: GenerateAnswerFormData): Promise<AxiosResponse<string[]>> => {
        return axiosInstance.post<string[]>("/chat/generate-answers", {
            question: data.question,
            answer: data.answer,
            numOfAnswers: data.numOfAnswers,
        })
    }
    // updateTestQuestions = (testId: string, questions: QuestionDTO[]) => {
    //     return axiosInstance.put(`/test/${testId}/questions`, questions)
    // }
    updateTestQuestions = (testId: string, data: UpdateTestDTO) => {
        return axiosInstance.put(`/test/${testId}/questions`, data)
    }
    updateTestSettings = (testId: string, updatedSettings: TestSettingsDTO) => {
        return axiosInstance.put(`/test/${testId}/settings`, updatedSettings)
    }
}
export const testService = new TestService()
