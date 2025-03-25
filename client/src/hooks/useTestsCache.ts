import { useTestStore } from "@/store/useTestStore"
import { TestsListDTO } from "@/types/testTypes"
import { useCallback, useState } from "react"

export const useTestsCache = () => {
    const { cache, setCache, clearCache: clearCacheFromStore, lastCacheUpdateDate } = useTestStore()
    const [cacheVersion, setCacheVersion] = useState(0)

    const getCacheKey = useCallback(
        (page: number, query: string = "") => (query ? `search-${query}-${page}` : `tests-${page}`),
        []
    )

    const getCachedData = useCallback((key: string) => cache[key], [cache])

    const saveToCache = useCallback(
        (key: string, data: TestsListDTO) => {
            setCache(key, data)
        },
        [setCache]
    )

    const clearCache = useCallback(() => {
        clearCacheFromStore()
        setCacheVersion(prev => prev + 1)
    }, [clearCacheFromStore])

    return {
        getCacheKey,
        getCachedData,
        saveToCache,
        clearCache,
        cacheVersion,
        lastUpdateDate: lastCacheUpdateDate,
    }
}
