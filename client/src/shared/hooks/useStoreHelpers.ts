import { AxiosError } from "axios"
import toast from "react-hot-toast"

export const handleError = (error: unknown): never => {
    if (error instanceof AxiosError) {
        if (error.code === "ERR_NETWORK") {
            toast.error("Сервер недоступен. Пожалуйста, проверьте подключение к интернету или повторите попытку позже")
        } else if (error.code === "ECONNABORTED") {
            toast.error("Превышено время ожидания ответа от сервера. Пожалуйста, повторите попытку")
        } else {
            toast.error(error.response?.data?.message || "Неизвестная ошибка")
        }
    } else {
        toast.error("Неизвестная ошибка, перезагрузите страницу")
    }
    throw error
}

export const createApiHandler = (set: any, loadingState: string) => {
    return async <T>(apiCall: () => Promise<T>): Promise<T> => {
        set({ [loadingState]: true })
        try {
            return await apiCall()
        } catch (error) {
            return handleError(error)
        } finally {
            set({ [loadingState]: false })
        }
    }
}
