import { useAttemptStore } from "@/features/attempts/store/useAttemptStore"
import { useTestStore } from "@/features/tests/store/useTestStore"
import { useUserStore } from "@/features/users/store/useUserStore"
import { AttemptsListDTO, TestsListDTO, UsersListDTO } from "@/shared/types"
import { useCallback, useState } from "react"
import { useLocation } from "react-router-dom"
import { StoreApi, UseBoundStore } from "zustand"

// Общий интерфейс для состояний с кэшем
export interface CacheState<T> {
	cache: Record<string, { data: T; timestamp: Date }>
	setCache: (key: string, data: T) => void
	clearCache: () => void
	lastCacheUpdateDate: Date | null
	CACHE_EXPIRATION_TIME: number
}

// Тип функции получения ключа кэша
type GetCacheKeyFn = (page: number, query?: string) => string

// Универсальный хук для кэширования
export function useCache<T>(
	useStore: UseBoundStore<StoreApi<CacheState<T> & any>>,
	prefixKey: string = "",
	customGetCacheKey?: GetCacheKeyFn
) {
	const { cache, setCache, clearCache: clearCacheFromStore, lastCacheUpdateDate, CACHE_EXPIRATION_TIME } = useStore()

	const [cacheVersion, setCacheVersion] = useState(0)

	// Использование функции getCacheKey или стандартной
	const getCacheKey = useCallback(
		customGetCacheKey ||
			((page: number, query: string = "") => (query ? `search-${query}-${page}` : `${prefixKey}-${page}`)),
		[customGetCacheKey, prefixKey]
	)

	const getCachedData = useCallback(
		(key: string): T | undefined => {
			const cachedEntry = cache[key]
			if (!cachedEntry) return undefined

			const now = new Date()
			const timeElapsed = now.getTime() - cachedEntry.timestamp.getTime()

			// Если время не вышло
			if (timeElapsed < CACHE_EXPIRATION_TIME) {
				return cachedEntry.data
			}

			// Если время вышло
			useStore.setState((state: any) => {
				const newCache = { ...state.cache }
				delete newCache[key]
				return { cache: newCache }
			})

			return undefined
		},
		[cache, CACHE_EXPIRATION_TIME, useStore]
	)

	const saveToCache = useCallback(
		(key: string, data: T) => {
			setCache(key, data)
		},
		[setCache]
	)

	const clearCache = useCallback(() => {
		clearCacheFromStore()
		setCacheVersion((prev) => prev + 1)
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

// Специализированные хуки
export const useUsersCache = () => {
	return useCache<UsersListDTO>(useUserStore, "users")
}

export const useTestsCache = () => {
	return useCache<TestsListDTO>(useTestStore, "tests")
}

export const useMyTestsCache = () => {
	return useCache<TestsListDTO>(useTestStore, "my-tests")
}

export const useAttemptsCache = () => {
	const location = useLocation()

	// Извлекаем testId из URL
	const getTestIdFromUrl = useCallback(() => {
		const pathParts = location.pathname.split("/")
		return pathParts[pathParts.length - 2] || null
	}, [location.pathname])

	// Функция для создания ключа кэша на основе testId
	const getAttemptsKey = useCallback(
		(page: number) => {
			const testId = getTestIdFromUrl()
			if (!testId) throw new Error("Test ID is missing in the URL")
			return `attempts-${testId}-${page}`
		},
		[getTestIdFromUrl]
	)

	return useCache<AttemptsListDTO>(useAttemptStore, "", getAttemptsKey)
}
