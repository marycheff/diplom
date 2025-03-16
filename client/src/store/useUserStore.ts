import { userService } from "@/services/userService"
import { UserState } from "@/types/userTypes"
import { AxiosError } from "axios"
import toast from "react-hot-toast"
import { create } from "zustand"

export const useUserStore = create<UserState>(set => ({
    isLoading: false,
    isAuthChecking: false,
    isUsersFetching: false,
    updatePassword: async (email, oldPassword, newPassword) => {
        set({ isLoading: true })
        try {
            await userService.updatePassword(email, oldPassword, newPassword)
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
        set({ isUsersFetching: true })
        try {
            const response = await userService.getUsers()
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "Неизвестная ошибка")
            } else {
                toast.error("Неизвестная ошибка, перезагрузите страницу")
            }
        } finally {
            set({ isUsersFetching: false })
        }
    },

    getUserById: async id => {
        set({ isLoading: true })
        try {
            //await useAuthStore.getState().noLoadingCheckAuth()
            const response = await userService.getUserById(id)
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
            const response = await userService.updateUser(id, updateData)
            toast.success("Данные пользователя успешно изменены")
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
            await userService.deleteUser(id)
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
            await userService.blockUser(id)
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
            await userService.unblockUser(id)
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
