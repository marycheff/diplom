import { createApiHandler } from "@/hooks/userStoreHelpers"
import { testService } from "@/services/testService"
import { GenerateAnswerFormData, TestsListDTO, TestState } from "@/types/testTypes"
import { create } from "zustand"

export const useTestStore = create<TestState>(set => {
    const withFetching = createApiHandler(set, "isFetching")
    const withLoading = createApiHandler(set, "isLoading")

    return {
        isFetching: false,
        isLoading: false,
        cache: {},
        MAX_CACHE_ENTRIES: 50,
        CACHE_EXPIRATION_TIME: 5 * 60 * 1000, //  5min
        lastCacheUpdateDate: null,
        setCache: (key: string, data: TestsListDTO) => {
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

        getTests: async (page = 1, limit = 10) => {
            const operation = async () => {
                const response = await testService.getTests(page, limit)
                return response.data
            }
            return withFetching(operation)
        },
        searchTests: async (query, page = 1, limit = 10) => {
            const operation = async () => {
                const response = await testService.searchTests(query, page, limit)
                return response.data
            }
            return withFetching(operation)
        },
        getTestById: async (id: string) => {
            const operation = async () => {
                const response = await testService.getTestById(id)
                return response.data
            }
            return withFetching(operation)
        },
        getMyTests: async (page = 1, limit = 10) => {
            const operation = async () => {
                const response = await testService.getMyTests(page, limit)
                return response.data
            }
            return withFetching(operation)
        },

        createTest: async (title, description) => {
            const operation = async () => {
                const response = await testService.createTest(title, description)
                return response.data
            }
            return withLoading(operation)
        },
        generateAnswers: (data: GenerateAnswerFormData) => {
            const operation = async () => {
                const response = await testService.generateAnswers(data)
                return response.data
            }
            return withLoading(operation)
        },
        updateTestQuestions: (testId, data) => {
            const operation = async () => {
                await testService.updateTestQuestions(testId, data)
            }
            return withLoading(operation)
        },
        updateTestSettings: (testId, updatedSettings) => {
            const operation = async () => {
                await testService.updateTestSettings(testId, updatedSettings)
            }
            return withLoading(operation)
        },
    }
})
