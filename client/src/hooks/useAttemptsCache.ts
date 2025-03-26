import { useAttemptStore } from "@/store/useAttemptStore"
import { AttemptsListDTO } from "@/types/testTypes"
import { useCallback, useState } from "react"

export const useAttemptsCache = () => {
    const { cache, setCache, clearCache: clearCacheFromStore, lastCacheUpdateDate } = useAttemptStore()
    const [cacheVersion, setCacheVersion] = useState(0)

    const getCacheKey = useCallback(
        (page: number, query: string = "") => (query ? `search-${query}-${page}` : `attempts-${page}`),
        []
    )

    const getCachedData = useCallback((key: string) => cache[key], [cache])

    const saveToCache = useCallback(
        (key: string, data: AttemptsListDTO) => {
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
