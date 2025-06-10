import axiosInstance from "@/api"
import {
	AttemptAnswer,
	AttemptDTO,
	AttemptResultDTO,
	AttemptsListDTO,
	AttemptsWithSnapshotListDTO,
	AttemptUserDTO,
	CompleteAttemptResponse,
	PreTestUserDataType,
	StartAttemptDTO,
} from "@/shared/types"
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
	getAttemptById(id: string): Promise<AxiosResponse<AttemptDTO>> {
		return axiosInstance.get<AttemptDTO>(`/tests/attempts/${id}`)
	}
	getAttemptResultsById(id: string): Promise<AxiosResponse<AttemptResultDTO>> {
		return axiosInstance.get<AttemptResultDTO>(`/tests/attempts/${id}/results`)
	}

	getAttemptForUserById(id: string): Promise<AxiosResponse<AttemptUserDTO>> {
		return axiosInstance.get<AttemptUserDTO>(`/tests/attempts/${id}/for-user`)
	}

	getAllAttempts(page = 1, limit = 10): Promise<AxiosResponse<AttemptsListDTO>> {
		return axiosInstance.get<AttemptsListDTO>("/tests/attempts/all", {
			params: {
				page,
				limit,
			},
		})
	}
	startTestAttempt(testId: string, preTestUserData?: PreTestUserDataType): Promise<AxiosResponse<StartAttemptDTO>> {
		return axiosInstance.post<StartAttemptDTO>(`/tests/${testId}/start`, {
			userData: preTestUserData,
		})
	}
	saveAnswers(attemptId: string, answers: AttemptAnswer[]): Promise<AxiosResponse<void>> {
		return axiosInstance.post<void>(`/tests/attempts/${attemptId}/answers`, {
			answers,
		})
	}
	completeAttempt(attemptId: string): Promise<AxiosResponse<CompleteAttemptResponse>> {
		return axiosInstance.post<CompleteAttemptResponse>(`/tests/attempts/${attemptId}/complete`)
	}
	getMyAttempts(page = 1, limit = 10): Promise<AxiosResponse<AttemptsWithSnapshotListDTO>> {
		return axiosInstance.get<AttemptsWithSnapshotListDTO>("/tests/attempts/my-attempts", {
			params: {
				page,
				limit,
			},
		})
	}
	getUserAttempts(userId: string, page = 1, limit = 10): Promise<AxiosResponse<AttemptsWithSnapshotListDTO>> {
		return axiosInstance.get<AttemptsWithSnapshotListDTO>(`/tests/attempts/users/${userId}`, {
			params: {
				page,
				limit,
			},
		})
	}
}

export const attemptService = new AttemptService()
