import axiosInstance from "@/api"
import {
    GenerateAnswerFormData,
    ShortTestInfo,
    SnapshotWithOriginalTestDTO,
    TestDTO,
    TestSettingsDTO,
    TestsListDTO,
    UpdateTestDTO,
    UserTestDTO,
} from "@/shared/types/testTypes"
import { AxiosResponse } from "axios"

class TestService {
    getTests(page = 1, limit = 10): Promise<AxiosResponse<TestsListDTO>> {
        return axiosInstance.get<TestsListDTO>("/tests/all-tests", {
            params: {
                page,
                limit,
            },
        })
    }

    searchTests(query: string, page = 1, limit = 10): Promise<AxiosResponse<TestsListDTO>> {
        return axiosInstance.get<TestsListDTO>("/tests/search", {
            params: {
                query,
                page,
                limit,
            },
        })
    }
    searchMyTests(query: string, page = 1, limit = 10): Promise<AxiosResponse<TestsListDTO>> {
        return axiosInstance.get<TestsListDTO>("/tests/my-tests/search", {
            params: {
                query,
                page,
                limit,
            },
        })
    }

    getTestById(id: string): Promise<AxiosResponse<TestDTO>> {
        return axiosInstance.get<TestDTO>(`/tests/${id}`)
    }
    getTestForUserById(id: string): Promise<AxiosResponse<UserTestDTO>> {
        return axiosInstance.get<UserTestDTO>(`/tests/${id}/for-user`)
    }
    getMyTests(page = 1, limit = 10): Promise<AxiosResponse<TestsListDTO>> {
        return axiosInstance.get<TestsListDTO>("/tests/my-tests", {
            params: {
                page,
                limit,
            },
        })
    }

    createTest(title: string, description?: string): Promise<AxiosResponse<TestDTO>> {
        return axiosInstance.post<TestDTO>("/tests/create", { title, description })
    }

    generateAnswers = (data: GenerateAnswerFormData): Promise<AxiosResponse<string[]>> => {
        return axiosInstance.post<string[]>("/chat/generate-answers", {
            question: data.question,
            answer: data.answer,
            numOfAnswers: data.numOfAnswers,
        })
    }
    // updateTestQuestions = (testId: string, questions: QuestionDTO[]) => {
    //     return axiosInstance.put(`/tests/${testId}/questions`, questions)
    // }
    updateTestQuestions = (testId: string, data: UpdateTestDTO) => {
        return axiosInstance.put(`/tests/${testId}/questions`, data)
    }
    updateTestSettings = (testId: string, updatedSettings: TestSettingsDTO) => {
        return axiosInstance.put(`/tests/${testId}/settings`, updatedSettings)
    }
    updateShortInfo = (testId: string, updatedShortInfo: ShortTestInfo) => {
        return axiosInstance.put(`/tests/${testId}/short-info`, updatedShortInfo)
    }
    getSnapshotById = (snapshotId: string): Promise<AxiosResponse<SnapshotWithOriginalTestDTO>> => {
        return axiosInstance.get<SnapshotWithOriginalTestDTO>(`/tests/snapshot/${snapshotId}`)
    }
}
export const testService = new TestService()
