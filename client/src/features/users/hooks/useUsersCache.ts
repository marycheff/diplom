import { useUserStore } from "@/features/users/store/useUserStore"
import { UsersListDTO } from "@/shared/types/userTypes"
import { useCallback, useState } from "react"

export const useUsersCache = () => {
    const {
        cache,
        setCache,
        clearCache: clearCacheFromStore,
        lastCacheUpdateDate,
        CACHE_EXPIRATION_TIME,
    } = useUserStore()
    const [cacheVersion, setCacheVersion] = useState(0)

    const getCacheKey = useCallback(
        (page: number, query: string = "") => (query ? `search-${query}-${page}` : `users-${page}`),
        []
    )

    const getCachedData = useCallback(
        (key: string): UsersListDTO | undefined => {
            const cachedEntry = cache[key]
            if (!cachedEntry) return undefined

            const now = new Date()
            const timeElapsed = now.getTime() - cachedEntry.timestamp.getTime()
            // Если время не вышло
            if (timeElapsed < CACHE_EXPIRATION_TIME) {
                return cachedEntry.data
            }
            // Если время вышло
            useUserStore.setState(state => {
                const newCache = { ...state.cache }
                delete newCache[key]
                return { cache: newCache }
            })
            return undefined
        },
        [cache, CACHE_EXPIRATION_TIME]
    )

    const saveToCache = useCallback(
        (key: string, data: UsersListDTO) => {
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
