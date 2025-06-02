import { AxiosError } from "axios"
import toast from "react-hot-toast"

export const handleError = (error: unknown): never => {
	if (error instanceof AxiosError) {
		const isLikelyCORSError = error.code === "ERR_NETWORK" && !error.response && error.request

		if (isLikelyCORSError) {
			toast.error("Ошибка CORS: сервер ответил без разрешённых заголовков")
		} else if (error.code === "ERR_NETWORK") {
			toast.error("Сервер недоступен. Пожалуйста, проверьте подключение к интернету или повторите попытку позже")
		} else if (error.code === "ECONNABORTED") {
			toast.error("Превышено время ожидания ответа от сервера. Пожалуйста, повторите попытку")
		} else {
			const message =
				error.response?.data?.message ||
				(typeof error.response?.data === "string" ? error.response.data : null) ||
				error.message ||
				"Неизвестная ошибка"
			toast.error(message)
		}
	} else {
		toast.error("Неизвестная ошибка, перезагрузите страницу")
	}
	throw error
}

type ZustandSetter<T> = (partial: Partial<T> | ((state: T) => Partial<T>)) => void

export const createApiHandler = <TState>(set: ZustandSetter<TState>, loadingState: keyof TState) => {
	return async <T>(apiCall: () => Promise<T>): Promise<T> => {
		set({ [loadingState]: true } as Partial<TState>)
		try {
			return await apiCall()
		} catch (error) {
			throw handleError(error)
		} finally {
			set({ [loadingState]: false } as Partial<TState>)
		}
	}
}
