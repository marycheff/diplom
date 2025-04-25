import { attemptService } from "@/api/services/attemptService"
import { createApiHandler } from "@/shared/hooks/useStoreHelpers"
import { AttemptState, AttemptsListDTO } from "@/shared/types"
import { create } from "zustand"

const initialState = {
    isFetching: false,
    isLoading: false,
    cache: {},
    CACHE_EXPIRATION_TIME: 5 * 60 * 1000, //  5min
    lastCacheUpdateDate: null,
}

export const useAttemptStore = create<AttemptState>(set => {
    const withFetching = createApiHandler(set, "isFetching")
    const withLoading = createApiHandler(set, "isLoading")
    return {
        ...initialState,
        setCache: (key: string, data: AttemptsListDTO) => {
            set(state => ({
                cache: {
                    ...state.cache,
                    [key]: {
                        data,
                        timestamp: new Date(),
                    },
                },
                lastCacheUpdateDate: new Date(),
            }))
        },
        clearCache: () => {
            set({ cache: {}, lastCacheUpdateDate: new Date() })
        },

        getTestAttempts: async (testId, page = 1, limit = 10) => {
            const operation = async () => {
                const response = await attemptService.getTestAttempts(testId, page, limit)
                return response.data
            }
            return withFetching(operation)
        },
        getAttemptById: async id => {
            const operation = async () => {
                const response = await attemptService.getAttemptById(id)
                return response.data
            }
            return withFetching(operation)
        },
        getAttemptForUserById: async id => {
            const operation = async () => {
                const response = await attemptService.getAttemptForUserById(id)
                return response.data
            }
            return withFetching(operation)
        },
        getAllAttempts: async (page = 1, limit = 10) => {
            const operation = async () => {
                const response = await attemptService.getAllAttempts(page, limit)
                return response.data
            }
            return withFetching(operation)
        },
        startAttempt: async (testId, userData) => {
            const operation = async () => {
                const response = await attemptService.startTestAttempt(testId, userData)
                return response.data
            }
            return withLoading(operation)
        },
        saveAnswers: async (attemptId, answers) => {
            const operation = async () => {
                await attemptService.saveAnswers(attemptId, answers)
            }
            return withLoading(operation)
        },
        completeAttempt: async attemptId => {
            const operation = async () => {
                const response = await attemptService.completeAttempt(attemptId)
                return response.data
            }
            return withLoading(operation)
        },
    }
})
