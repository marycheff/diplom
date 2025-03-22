import { AxiosError } from "axios"
import toast from "react-hot-toast"

export const handleError = (error: unknown): never => {
    if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Неизвестная ошибка")
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
