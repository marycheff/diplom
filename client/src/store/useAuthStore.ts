import { API_URL } from "@/http/axios"
import { AuthResponse } from "@/models/response/AuthResponse"
import AuthService from "@/services/AuthService"
import { AuthState } from "@/types/auth.types"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"
import { create } from "zustand"

export const useAuthStore = create<AuthState>(set => ({
    user: null,
    isAuth: false,
    isLoading: false,
    isAdmin: false,
    isAuthChecking: false,
    isEmailSending: false,

    login: async (email, password) => {
        set({ isLoading: true })
        try {
            const response = await AuthService.login(email, password)
            localStorage.setItem("token", response.data.accessToken)
            set({
                user: response.data.user,
                isAuth: true,
                isAdmin: response.data.user.role === "ADMIN",
            })
            toast.success("Успешный вход")
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "Неизвестная ошибка")
            } else {
                toast.error("Неизвестная ошибка, перезагрузите страницу")
            }
        } finally {
            set({ isLoading: false })
        }
    },

    registration: async (email, password) => {
        set({ isLoading: true })
        try {
            const response = await AuthService.registration(email, password)
            localStorage.setItem("token", response.data.accessToken)
            set({
                user: response.data.user,
                isAuth: true,
            })
            toast.success("Успешная регистрация")
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "Неизвестная ошибка")
            } else {
                toast.error("Неизвестная ошибка, перезагрузите страницу")
            }
        } finally {
            set({ isLoading: false })
        }
    },

    logout: async () => {
        try {
            await AuthService.logout()
            localStorage.removeItem("token")
            set({
                user: null,
                isAuth: false,
            })
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "Неизвестная ошибка")
            } else {
                toast.error("Неизвестная ошибка, перезагрузите страницу")
            }
        }
    },

    checkAuth: async () => {
        set({ isAuthChecking: false })
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, { withCredentials: true })
            localStorage.setItem("token", response.data.accessToken)
            set({
                user: response.data.user,
                isAuth: true,
                isAdmin: response.data.user.role === "ADMIN",
            })
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status != 401) toast.error(error.response?.data?.message || "Неизвестная ошибка")
            } else {
                toast.error("Неизвестная ошибка, перезагрузите страницу")
            }
        } finally {
            set({ isAuthChecking: false })
        }
    },

    noLoadingCheckAuth: async () => {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, { withCredentials: true })
            localStorage.setItem("token", response.data.accessToken)
            set({
                user: response.data.user,
                isAuth: true,
                isAdmin: response.data.user.role === "ADMIN",
            })
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "Неизвестная ошибка")
            } else {
                toast.error("Неизвестная ошибка, перезагрузите страницу")
            }
        }
    },

    updateActivationLink: async (email: string) => {
        set({ isEmailSending: true })
        try {
            const response = await AuthService.updateActivationLink(email)
            toast.success("Ссылка для активации отправлена на вашу электронную почту")
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "Неизвестная ошибка")
            } else {
                toast.error("Неизвестная ошибка, перезагрузите страницу")
            }
        } finally {
            set({ isEmailSending: false })
        }
    },
}))
