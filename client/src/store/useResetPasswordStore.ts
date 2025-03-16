import { API_URL } from "@/axios"
import { ResetPasswordState } from "@/types/authTypes"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"
import { create } from "zustand"

export const useResetPasswordStore = create<ResetPasswordState>((set, get) => ({
    resetCodeTimestamp: null,
    isLoading: false,

    requestResetCode: async email => {
        set({ isLoading: true })
        try {
            const response = await axios.post(`${API_URL}/auth/reset-password-request`, { email })
            set({ resetCodeTimestamp: Date.now() })
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "Неизвестная ошибка")
            } else {
                toast.error("Неизвестная ошибка, перезагрузите страницу")
            }
            throw error
        } finally {
            set({ isLoading: false })
        }
    },

    verifyResetCode: async (email, code) => {
        set({ isLoading: true })
        if (!get().isResetCodeValid()) {
            set({ isLoading: false })
            throw new Error("Срок действия кода сброса истек. Пожалуйста, запросите новый код.")
        }
        try {
            const response = await axios.post(`${API_URL}/auth/verify-reset-code`, { email, code })
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "Неизвестная ошибка")
            } else {
                toast.error("Неизвестная ошибка, перезагрузите страницу")
            }
            throw error
        } finally {
            set({ isLoading: false })
        }
    },

    resetPassword: async (email, code, newPassword) => {
        set({ isLoading: true })
        if (!get().isResetCodeValid()) {
            set({ isLoading: false })
            toast.error("Срок действия кода сброса истек. Пожалуйста, запросите новый код.")
            throw new Error()
        }
        try {
            const response = await axios.post(`${API_URL}/auth/reset-password`, { email, code, newPassword })
            set({ resetCodeTimestamp: null })
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "Неизвестная ошибка")
            } else {
                toast.error("Неизвестная ошибка, перезагрузите страницу")
            }
            throw error
        } finally {
            set({ isLoading: false })
        }
    },

    isResetCodeValid: () => {
        const { resetCodeTimestamp } = get()
        if (!resetCodeTimestamp) {
            return false
        }
        const currentTime = Date.now()
        return (
            currentTime - resetCodeTimestamp <
            Number(import.meta.env.VITE_RESET_PASSWORD_TIMEOUT_MINUTES || 5) * 60 * 1000
        )
    },
}))
