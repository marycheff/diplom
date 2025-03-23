import { useTestStore } from "@/store/useTestStore"
import { TestsListDTO } from "@/types/testTypes"
import { useCallback, useState } from "react"

export const useTestsCache = () => {
    const { cache, setCache, clearCache: clearCacheFromStore } = useTestStore()
    const [cacheVersion, setCacheVersion] = useState(0)

    const getCacheKey = (page: number, query: string) => (query ? `search-${query}-${page}` : `tests-${page}`)

    const getCachedData = (key: string) => cache[key]

    const saveToCache = (key: string, data: TestsListDTO) => {
        setCache(key, data)
    }

    const clearCache = useCallback(() => {
        clearCacheFromStore()
        setCacheVersion(prev => prev + 1)
    }, [clearCacheFromStore])

    return { getCacheKey, getCachedData, saveToCache, clearCache, cacheVersion }
}
