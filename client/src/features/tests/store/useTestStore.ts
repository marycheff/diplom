import { testService } from "@/api/services/testService"
import { createApiHandler } from "@/shared/hooks/useStoreHelpers"
import { GenerateAnswerFormData, TestState, TestsListDTO } from "@/shared/types"
import { create } from "zustand"

const initialState = {
    isFetching: false,
    isLoading: false,
    isShortInfoUpdating: false,
    isSettingsUpdating: false,
    isGenerating: false,
    isVisibilityUpdating: false,
    isModerationStatusUpdating: false,
    cache: {},
    MAX_CACHE_ENTRIES: 50,
    CACHE_EXPIRATION_TIME: 5 * 60 * 1000, //  5min
    lastCacheUpdateDate: null,
}
export const useTestStore = create<TestState>(set => {
    const withFetching = createApiHandler(set, "isFetching")
    const withLoading = createApiHandler(set, "isLoading")
    const withShortInfoUpdating = createApiHandler(set, "isShortInfoUpdating")
    const withSettingsUpdating = createApiHandler(set, "isSettingsUpdating")
    const withGenerating = createApiHandler(set, "isGenerating")
    const withVisibilityUpdating = createApiHandler(set, "isVisibilityUpdating")
    const withModerationStatusUpdating = createApiHandler(set, "isModerationStatusUpdating")

    return {
        ...initialState,
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
        getUnmoderatedTests: async (page = 1, limit = 10) => {
            const operation = async () => {
                const response = await testService.getUnmoderatedTests(page, limit)
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
        searchMyTests: async (query, page = 1, limit = 10) => {
            const operation = async () => {
                const response = await testService.searchMyTests(query, page, limit)
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
        getTestForUserById: async (testId, attemptId) => {
            const operation = async () => {
                const response = await testService.getTestForUserById(testId, attemptId)
                return response.data
            }
            return withFetching(operation)
        },
        getTestSnapshotForUser: async (snapshotId, attemptId) => {
            const operation = async () => {
                const response = await testService.getTestSnapshotForUser(snapshotId, attemptId)
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
        getUserTests: async (userId, page = 1, limit = 10) => {
            const operation = async () => {
                const response = await testService.getUserTests(userId, page, limit)
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
        generateAnswers: async (data: GenerateAnswerFormData) => {
            const operation = async () => {
                const response = await testService.generateAnswers(data)
                return response.data
            }
            return withGenerating(operation)
        },
        updateTestQuestions: async (testId, data) => {
            const operation = async () => {
                await testService.updateTestQuestions(testId, data)
            }
            return withLoading(operation)
        },
        updateTestSettings: async (testId, updatedSettings) => {
            const operation = async () => {
                await testService.updateTestSettings(testId, updatedSettings)
            }
            return withSettingsUpdating(operation)
        },
        updateShortInfo: async (testId, updatedShortInfo) => {
            const operation = async () => {
                await testService.updateShortInfo(testId, updatedShortInfo)
            }
            return withShortInfoUpdating(operation)
        },
        getSnapshotById: async snapshotId => {
            const operation = async () => {
                const response = await testService.getSnapshotById(snapshotId)
                return response.data
            }
            return withFetching(operation)
        },
        upsertQuestions: async (testId, questions) => {
            const operation = async () => {
                const response = await testService.upsertQuestions(testId, questions)
                return response.data
            }
            return withLoading(operation)
        },
        changeVisibilityStatus: async (testId, status) => {
            const operation = async () => {
                await testService.changeVisibilityStatus(testId, status)
            }
            return withVisibilityUpdating(operation)
        },
        changeModerationStatus: async (testId, status) => {
            const operation = async () => {
                await testService.changeModerationStatus(testId, status)
            }
            return withModerationStatusUpdating(operation)
        },

        deleteTest: async id => {
            const operation = async () => {
                await testService.deleteTest(id)
            }
            return withLoading(operation)
        },
    }
})
