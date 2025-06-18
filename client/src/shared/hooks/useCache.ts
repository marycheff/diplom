import { useAttemptStore } from "@/features/attempts/store/useAttemptStore"
import { useTestStore } from "@/features/tests/store/useTestStore"
import { useUserStore } from "@/features/users/store/useUserStore"
import { AttemptFilterParams, AttemptsListDTO, TestsListDTO, UsersListDTO } from "@/shared/types"
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
type GetCacheKeyFn<TFilters = any> = (page: number, query?: string, filters?: TFilters) => string

// Универсальный хук для кэширования
export function useCache<T, TFilters = any>(
	useStore: UseBoundStore<StoreApi<CacheState<T> & any>>,
	prefixKey: string = "",
	customGetCacheKey?: GetCacheKeyFn<TFilters>
) {
	const { cache, setCache, clearCache: clearCacheFromStore, lastCacheUpdateDate, CACHE_EXPIRATION_TIME } = useStore()

	const [cacheVersion, setCacheVersion] = useState(0)

	// Использование функции getCacheKey или стандартной
	const getCacheKey = useCallback(
		customGetCacheKey ||
			((page: number, query: string = "", filters?: TFilters) => {
				let key = `${prefixKey}-${page}`
				if (query) key += `-search-${query}`
				if (filters) {
					const filterStr = Object.entries(filters)
						.filter(([_, value]) => value !== undefined)
						.map(([key, value]) => `${key}-${value}`)
						.join("_")
					if (filterStr) key += `-filters-${filterStr}`
				}
				return key
			}),
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

	const getTestIdFromUrl = useCallback(() => {
		const pathParts = location.pathname.split("/")
		return pathParts[pathParts.length - 2] || null
	}, [location.pathname])

	// Функция для создания ключа кэша на основе testId и фильтров
	const getAttemptsKey = useCallback(
		(page: number, _?: string, filters?: AttemptFilterParams) => {
			const testId = getTestIdFromUrl()
			if (!testId) throw new Error("Test ID is missing in the URL")

			let key = `attempts-${testId}-${page}`
			if (filters?.status) {
				key += `-status-${filters.status}`
			}
			return key
		},
		[getTestIdFromUrl]
	)

	return useCache<AttemptsListDTO, AttemptFilterParams>(useAttemptStore, "", getAttemptsKey)
}
