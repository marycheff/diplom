import { useUserStore } from "@/store/useUserStore"
import { UsersListDTO } from "@/types/userTypes"
import { useCallback, useState } from "react"

export const useUsersCache = () => {
    const { cache, setCache, clearCache: clearCacheFromStore, lastCacheUpdateDate } = useUserStore()
    const [cacheVersion, setCacheVersion] = useState(0)

    const getCacheKey = useCallback(
        (page: number, query: string = "") => (query ? `search-${query}-${page}` : `users-${page}`),
        []
    )

    const getCachedData = useCallback((key: string) => cache[key], [cache])

    const saveToCache = useCallback(
        (key: string, data: UsersListDTO) => {
            setCache(key, data)
        },
        [setCache]
    )

    const clearCache = useCallback(() => {
        clearCacheFromStore()
        setCacheVersion(prev => prev + 1)

    }, [clearCacheFromStore, ])

    return {
        getCacheKey,
        getCachedData,
        saveToCache,
        clearCache,
        cacheVersion,
        lastUpdateDate: lastCacheUpdateDate,
    }
}
