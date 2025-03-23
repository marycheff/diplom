import { useTestStore } from "@/store/useTestStore"
import { TestsListDTO } from "@/types/testTypes"
import { useCallback, useState } from "react"

export const useTestsCache = () => {
    const { cache, setCache, clearCache: clearCacheFromStore, lastCacheUpdateDate } = useTestStore()
    const [cacheVersion, setCacheVersion] = useState(0)

    const getCacheKey = (page: number, query: string) => (query ? `search-${query}-${page}` : `tests-${page}`)

    const getCachedData = (key: string) => cache[key]

    const saveToCache = (key: string, data: TestsListDTO) => {
        setCache(key, data)
        // No need to set local date state, as it's now in the store
    }

    const clearCache = useCallback(() => {
        clearCacheFromStore()
        setCacheVersion(prev => prev + 1)
        // No need to set local date state, as it's now in the store
    }, [clearCacheFromStore])

    return {
        getCacheKey,
        getCachedData,
        saveToCache,
        clearCache,
        cacheVersion,
        lastUpdateDate: lastCacheUpdateDate, // Pass the date from the store
    }
}
