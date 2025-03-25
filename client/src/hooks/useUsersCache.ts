import { useUserStore } from "@/store/useUserStore"
import { UsersListDTO } from "@/types/userTypes"
import { useCallback, useState } from "react"

export const useUsersCache = () => {
    const { cache, setCache, clearCache: clearCacheFromStore, lastCacheUpdateDate } = useUserStore()
    const [cacheVersion, setCacheVersion] = useState(0)

    const getCacheKey = (page: number, query: string) => (query ? `search-${query}-${page}` : `users-${page}`)

    const getCachedData = (key: string) => cache[key]

    const saveToCache = (key: string, data: UsersListDTO) => {
        setCache(key, data)
    }

    const clearCache = useCallback(() => {
        clearCacheFromStore()
        setCacheVersion(prev => prev + 1)
    }, [clearCacheFromStore])

    return { getCacheKey, getCachedData, saveToCache, clearCache, cacheVersion, lastUpdateDate: lastCacheUpdateDate }
}
