import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { AuthResponse } from "../models/response/AuthResponse"

export const API_URL = import.meta.env.VITE_API_URL

// Расширяем тип InternalAxiosRequestConfig, чтобы добавить свойство _isRetry
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _isRetry?: boolean
}

const axiosInstance: AxiosInstance = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

// Интерцептор для добавления токена в заголовки
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers = config.headers || {}
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Интерцептор для обработки ошибок и обновления токена
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig

        // Проверяем, что ошибка связана с истекшим токеном
        if (error.response?.status === 401 && !originalRequest._isRetry) {
            originalRequest._isRetry = true
            try {
                // Запрос на обновление токена
                const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, { withCredentials: true })
                localStorage.setItem("token", response.data.accessToken)

                // Повторяем оригинальный запрос с новым токеном
                return axiosInstance(originalRequest)
            } catch (e) {
                console.log("Пользователь не авторизован")
                localStorage.removeItem("token")
                sessionStorage.removeItem("authChecked")
            }
        }

        // Пробрасываем ошибку дальше, если она не связана с истекшим токеном
        throw error
    }
)

export default axiosInstance
