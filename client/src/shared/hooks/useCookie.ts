import { useEffect, useState } from "react"

type CookieOptions = {
	expires?: number // дни
	path?: string
	domain?: string
	secure?: boolean
	sameSite?: "strict" | "lax" | "none"
}

export function useCookie<T>(
	key: string,
	initialValue?: T,
	options: CookieOptions = { expires: 1, path: "/" }
): [T, (value: T | ((val: T) => T)) => void, () => void] {
	// Если initialValue не передан, используется пустой объект
	const defaultValue = initialValue !== undefined ? initialValue : ({} as T)

	// Функция для чтения куки
	const readCookie = (): T => {
		const nameEQ = `${key}=`
		const ca = document.cookie.split(";")
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i]
			while (c.charAt(0) === " ") c = c.substring(1)
			if (c.indexOf(nameEQ) === 0) {
				const cookieValue = c.substring(nameEQ.length)
				try {
					return JSON.parse(decodeURIComponent(cookieValue)) as T
				} catch (e) {
					return defaultValue
				}
			}
		}
		return defaultValue
	}

	// Инициализация состояния
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			return readCookie()
		} catch (error) {
			console.error(`Error reading cookie "${key}":`, error)
			return defaultValue
		}
	})

	// Функция для установки значения в куки
	const setCookie = (value: T | ((val: T) => T)) => {
		try {
			const valueToStore = value instanceof Function ? value(storedValue) : value
			setStoredValue(valueToStore)

			let cookieString = `${key}=${encodeURIComponent(JSON.stringify(valueToStore))}`
			if (options.expires) {
				const d = new Date()
				d.setTime(d.getTime() + options.expires * 24 * 60 * 60 * 1000)
				cookieString += `;expires=${d.toUTCString()}`
			}
			if (options.path) cookieString += `;path=${options.path}`
			if (options.domain) cookieString += `;domain=${options.domain}`
			if (options.secure) cookieString += ";secure"
			if (options.sameSite) cookieString += `;samesite=${options.sameSite}`

			document.cookie = cookieString
		} catch (error) {
			console.error(`Error setting cookie "${key}":`, error)
		}
	}

	// Функция для удаления куки
	const removeCookie = () => {
		document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=${options.path || "/"}`
		setStoredValue(defaultValue)
	}

	// Синхронизация состояния при изменении ключа
	useEffect(() => {
		setStoredValue(readCookie())
	}, [key])

	return [storedValue, setCookie, removeCookie]
}
