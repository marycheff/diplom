import { useTestStore } from "@/store/useTestStore"
import { TestsListDTO } from "@/types/testTypes"
import { useCallback, useState } from "react"

export const useMyTestsCache = () => {
    const {
        cache,
        setCache,
        clearCache: clearCacheFromStore,
        lastCacheUpdateDate,
        CACHE_EXPIRATION_TIME,
    } = useTestStore()
    const [cacheVersion, setCacheVersion] = useState(0)

    const getCacheKey = useCallback(
        (page: number, query: string = "") => (query ? `search-${query}-${page}` : `my-tests-${page}`),
        []
    )

    const getCachedData = useCallback(
        (key: string): TestsListDTO | undefined => {
            const cachedEntry = cache[key]
            if (!cachedEntry) return undefined

            const now = new Date()
            const timeElapsed = now.getTime() - cachedEntry.timestamp.getTime()
            // Если время не вышло
            if (timeElapsed < CACHE_EXPIRATION_TIME) {
                return cachedEntry.data
            }
            // Если время вышло
            useTestStore.setState(state => {
                const newCache = { ...state.cache }
                delete newCache[key]
                return { cache: newCache }
            })
            return undefined
        },
        [cache, CACHE_EXPIRATION_TIME]
    )

    const saveToCache = useCallback(
        (key: string, data: TestsListDTO) => {
            setCache(key, data)
        },
        [setCache]
    )

    const clearCache = useCallback(() => {
        clearCacheFromStore()
        setCacheVersion(prev => prev + 1)
        console.log("Кэш очищен")
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
