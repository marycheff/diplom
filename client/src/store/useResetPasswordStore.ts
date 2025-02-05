import { API_URL } from "@/http/axios"
import { ResetPasswordState } from "@/types/auth.types"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"
import { create } from "zustand"

export const useResetPasswordStore = create<ResetPasswordState>((set, get) => ({
    resetCodeTimestamp: null,

    requestResetCode: async email => {
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
        }
    },

    verifyResetCode: async (email, code) => {
        if (!get().isResetCodeValid()) {
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
        }
    },

    resetPassword: async (email, code, newPassword) => {
        if (!get().isResetCodeValid()) {
            throw new Error("Срок действия кода сброса истек. Пожалуйста, запросите новый код.")
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
