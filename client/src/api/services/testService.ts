import axiosInstance from "@/api"
import {
	GenerateAnswerFormData,
	ModerationStatus,
	QuestionDTO,
	ShortTestInfo,
	SnapshotWithOriginalTestDTO,
	TestDTO,
	TestSettingsDTO,
	TestsListDTO,
	TestVisibilityStatus,
	UserTestDTO
} from "@/shared/types"
import { AxiosResponse } from "axios"

class TestService {
	getTests(page = 1, limit = 10): Promise<AxiosResponse<TestsListDTO>> {
		return axiosInstance.get<TestsListDTO>("/tests/all-tests", {
			params: {
				page,
				limit
			}
		})
	}
	deleteTest(testId: string): Promise<AxiosResponse<void>> {
		return axiosInstance.delete<void>(`/tests/${testId}`)
	}
	getUnmoderatedTests(page = 1, limit = 10): Promise<AxiosResponse<TestsListDTO>> {
		return axiosInstance.get<TestsListDTO>("/tests/all-unmoderated-tests", {
			params: {
				page,
				limit
			}
		})
	}

	searchTests(query: string, page = 1, limit = 10): Promise<AxiosResponse<TestsListDTO>> {
		return axiosInstance.get<TestsListDTO>("/tests/search", {
			params: {
				query,
				page,
				limit
			}
		})
	}
	searchMyTests(query: string, page = 1, limit = 10): Promise<AxiosResponse<TestsListDTO>> {
		return axiosInstance.get<TestsListDTO>("/tests/my-tests/search", {
			params: {
				query,
				page,
				limit
			}
		})
	}

	getTestById(id: string): Promise<AxiosResponse<TestDTO>> {
		return axiosInstance.get<TestDTO>(`/tests/${id}`)
	}

	getTestForAttempt(testId: string, attemptId: string): Promise<AxiosResponse<UserTestDTO>> {
		return axiosInstance.get<UserTestDTO>(`/tests/${testId}/for-attempt`, {
			params: { attemptId }
		})
	}
	getBasicTestInfo(testId: string): Promise<AxiosResponse<UserTestDTO>> {
		return axiosInstance.get<UserTestDTO>(`/tests/${testId}/basic`)
	}

	getTestSnapshotForAttempt(snapshotId: string, attemptId?: string): Promise<AxiosResponse<UserTestDTO>> {
		return axiosInstance.get<UserTestDTO>(`/tests/snapshot/${snapshotId}/for-attempt`, {
			params: { attemptId }
		})
	}

	getMyTests(page = 1, limit = 10): Promise<AxiosResponse<TestsListDTO>> {
		return axiosInstance.get<TestsListDTO>("/tests/my-tests", {
			params: {
				page,
				limit
			}
		})
	}
	getUserTests(userId: string, page = 1, limit = 10): Promise<AxiosResponse<TestsListDTO>> {
		return axiosInstance.get<TestsListDTO>(`/tests/users/${userId}`, {
			params: {
				page,
				limit
			}
		})
	}

	createTest(title: string, description?: string): Promise<AxiosResponse<TestDTO>> {
		return axiosInstance.post<TestDTO>("/tests/create", { title, description })
	}

	generateAnswers = (data: GenerateAnswerFormData): Promise<AxiosResponse<string[]>> => {
		return axiosInstance.post<string[]>("/chat/generate-answers", {
			question: data.question,
			answer: data.answer,
			numOfAnswers: Number(data.numOfAnswers)
		})
	}
	generateTest = (topic: string, numOfQuestions = 10): Promise<AxiosResponse<TestDTO>> => {
		return axiosInstance.post<TestDTO>("/chat/generate-test", {
			topic,
			numOfQuestions
		})
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
	upsertQuestions = (testId: string, questions: QuestionDTO[]): Promise<AxiosResponse<QuestionDTO[]>> => {
		return axiosInstance.put(`/tests/${testId}/questions-upsert`, { questions })
	}

	changeVisibilityStatus = (testId: string, status: TestVisibilityStatus): Promise<AxiosResponse<void>> => {
		return axiosInstance.put(`/tests/${testId}/visibility`, { status })
	}
	changeModerationStatus = (testId: string, status: ModerationStatus): Promise<AxiosResponse<void>> => {
		return axiosInstance.put(`/tests/${testId}/moderation-status`, { status })
	}
}
export const testService = new TestService()
