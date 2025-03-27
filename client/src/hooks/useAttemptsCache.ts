import { useAttemptStore } from "@/store/useAttemptStore"
import { AttemptsListDTO } from "@/types/testTypes"
import { useCallback, useState } from "react"
import { useLocation } from "react-router-dom"

export const useAttemptsCache = () => {
    const {
        cache,
        setCache,
        clearCache: clearCacheFromStore,
        lastCacheUpdateDate,
        CACHE_EXPIRATION_TIME,
    } = useAttemptStore()
    const [cacheVersion, setCacheVersion] = useState(0)
    const location = useLocation()

    // Извлекаем testId из URL
    const getTestIdFromUrl = useCallback(() => {
        const pathParts = location.pathname.split("/")
        return pathParts[pathParts.length - 2] || null
    }, [location.pathname])

    const getCacheKey = useCallback(
        (page: number) => {
            const testId = getTestIdFromUrl()
            if (!testId) throw new Error("Test ID is missing in the URL")
            return `attempts-${testId}-${page}`
        },
        [getTestIdFromUrl]
    )

    const getCachedData = useCallback(
        (key: string): AttemptsListDTO | undefined => {
            const cachedEntry = cache[key]
            if (!cachedEntry) return undefined

            const now = new Date()
            const timeElapsed = now.getTime() - cachedEntry.timestamp.getTime()
            // Если время не вышло
            if (timeElapsed < CACHE_EXPIRATION_TIME) {
                return cachedEntry.data
            }
            // Если время вышло
            useAttemptStore.setState(state => {
                const newCache = { ...state.cache }
                delete newCache[key]
                return { cache: newCache }
            })
            return undefined
        },
        [cache, CACHE_EXPIRATION_TIME]
    )

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
