import UserService from "@/services/UserService"
import { useAuthStore } from "@/store/useAuthStore"
import { UserState } from "@/types/user.types"
import { AxiosError } from "axios"
import toast from "react-hot-toast"
import { create } from "zustand"

export const useUserStore = create<UserState>(set => ({
    isLoading: false,
    isAuthChecking: false,
    updatePassword: async (email, oldPassword, newPassword) => {
        set({ isLoading: true })
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
        set({ isLoading: false })
    },

    getUsers: async () => {
        set({ isLoading: true })
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
        } finally {
            set({ isLoading: false })
        }
    },

    getUserById: async id => {
        set({ isLoading: true })
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
        } finally {
            set({ isLoading: false })
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
        set({ isLoading: true })
        try {
            await UserService.deleteUser(id)
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

    blockUser: async id => {
        set({ isLoading: true })
        try {
            await UserService.blockUser(id)
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

    unblockUser: async id => {
        set({ isLoading: true })
        try {
            await UserService.unblockUser(id)
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
}))
