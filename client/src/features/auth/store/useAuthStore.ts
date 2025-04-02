import { authService } from "@/api/services/authService"
import { createApiHandler } from "@/shared/hooks/useStoreHelpers"
import { AuthState } from "@/shared/types/authTypes"
import { AxiosError } from "axios"
import toast from "react-hot-toast"
import { create } from "zustand"

export const useAuthStore = create<AuthState>(set => {
    // Обработчики для разных состояний загрузки
    const withLoading = createApiHandler(set, "isLoading")
    const withAuthChecking = createApiHandler(set, "isAuthChecking")
    const withEmailSending = createApiHandler(set, "isEmailSending")

    return {
        user: null,
        isAuth: false,
        isLoading: false,
        isAdmin: false,
        isAuthChecking: false,
        isEmailSending: false,

        login: async (email, password) => {
            const operation = async () => {
                const response = await authService.login(email, password)
                localStorage.setItem("token", response.data.accessToken)
                set({
                    user: response.data.user,
                    isAuth: true,
                    isAdmin: response.data.user.role === "ADMIN",
                })
            }
            return withLoading(operation)
        },

        registration: async (email, password) => {
            const operation = async () => {
                const response = await authService.registration(email, password)
                localStorage.setItem("token", response.data.accessToken)
                set({
                    user: response.data.user,
                    isAuth: true,
                })
            }
            return withLoading(operation)
        },

        logout: async () => {
            try {
                await authService.logout()
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
                throw error
            }
        },

        checkAuth: async () => {
            const operation = async () => {
                const response = await authService.checkAuth()
                localStorage.setItem("token", response.data.accessToken)
                set({
                    user: response.data.user,
                    isAuth: true,
                    isAdmin: response.data.user.role === "ADMIN",
                })
            }
            return await withAuthChecking(operation)
            // try {
            // } catch (error) {
            //     console.log(error)
            //     throw error
            // }
        },

        updateActivationLink: async (email: string) => {
            const operation = async () => {
                const response = await authService.updateActivationLink(email)
                toast.success("Ссылка для активации отправлена на вашу электронную почту")
                return response.data
            }
            return withEmailSending(operation)
        },
    }
})
