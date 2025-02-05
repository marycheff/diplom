import UserService from "@/services/UserService"
import { useAuthStore } from "@/store/useAuthStore"
import { UserState } from "@/types/user.types"
import { AxiosError } from "axios"
import toast from "react-hot-toast"
import { create } from "zustand"

export const useUserStore = create<UserState>(set => ({
    isLoading: false,
    updatePassword: async (email, oldPassword, newPassword) => {
        try {
            await UserService.updatePassword(email, oldPassword, newPassword)
            console.log("Пароль успешно обновлен")
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "Неизвестная ошибка")
            } else {
                toast.error("Неизвестная ошибка, перезагрузите страницу")
            }
        }
    },

    getUsers: async () => {
        try {
            await useAuthStore.getState().noLoadingCheckAuth()
            const response = await UserService.getUsers()
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "Неизвестная ошибка")
            } else {
                toast.error("Неизвестная ошибка, перезагрузите страницу")
            }
        }
    },

    getUserById: async id => {
        try {
            await useAuthStore.getState().noLoadingCheckAuth()
            const response = await UserService.getUserById(id)
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "Неизвестная ошибка")
            } else {
                toast.error("Неизвестная ошибка, перезагрузите страницу")
            }
        }
    },

    updateUser: async (id, updateData) => {
        set({ isLoading: true })
        try {
            const response = await UserService.updateUser(id, updateData)
            console.log("Данные пользователя обновлены")
            return response.data
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

    deleteUser: async id => {
        try {
            await UserService.deleteUser(id)
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "Неизвестная ошибка")
            } else {
                toast.error("Неизвестная ошибка, перезагрузите страницу")
            }
        }
    },

    blockUser: async id => {
        try {
            await UserService.blockUser(id)
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "Неизвестная ошибка")
            } else {
                toast.error("Неизвестная ошибка, перезагрузите страницу")
            }
        }
    },

    unblockUser: async id => {
        try {
            await UserService.unblockUser(id)
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "Неизвестная ошибка")
            } else {
                toast.error("Неизвестная ошибка, перезагрузите страницу")
            }
        }
    },
}))
