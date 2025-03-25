import { createApiHandler } from "@/hooks/userStoreHelpers"
import { testService } from "@/services/testService"
import { TestsListDTO, TestState } from "@/types/testTypes"
import { create } from "zustand"

export const useTestStore = create<TestState>(set => {
    const withFetching = createApiHandler(set, "isFetching")

    return {
        isFetching: false,
        cache: {},
        MAX_CACHE_ENTRIES: 50,
        lastCacheUpdateDate: null,
        setCache: (key: string, data: TestsListDTO) => {
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
    }
})
