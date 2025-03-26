import { createApiHandler } from "@/hooks/userStoreHelpers"
import { attemptService } from "@/services/attemptService"
import { AttemptsListDTO, AttemptState } from "@/types/testTypes"
import { create } from "zustand"

export const useAttemptStore = create<AttemptState>(set => {
    const withFetching = createApiHandler(set, "isFetching")
    return {
        isFetching: false,
        cache: {},
        MAX_CACHE_ENTRIES: 50,
        lastCacheUpdateDate: null,
        setCache: (key: string, data: AttemptsListDTO) => {
            set(state => {
                const newCache = { ...state.cache, [key]: data }
                const keys = Object.keys(newCache)
                if (keys.length > state.MAX_CACHE_ENTRIES) {
                    delete newCache[keys[0]]
                }
                return { cache: newCache, lastCacheUpdateDate: new Date() }
            })
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
    }
})
