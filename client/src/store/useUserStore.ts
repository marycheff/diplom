import { userService } from "@/services/userService"
import { UserDTO, UserState } from "@/types/userTypes"
import { create } from "zustand"
import { createApiHandler } from "@/hooks/userStoreHelpers"
import toast from "react-hot-toast"

export const useUserStore = create<UserState>(set => {
    const withLoading = createApiHandler(set, "isLoading")
    const withFetching = createApiHandler(set, "isFetching")

    return {
        isLoading: false,
        isAuthChecking: false,
        isFetching: false,
        cache: {},
        MAX_CACHE_ENTRIES: 50,

        setCache: (key: string, data: { users: UserDTO[]; total: number }) => {
            set(state => {
                const newCache = { ...state.cache, [key]: data }
                const keys = Object.keys(newCache)
                if (keys.length > state.MAX_CACHE_ENTRIES) {
                    delete newCache[keys[0]]
                }
                return { cache: newCache }
            })
        },

        clearCache: () => {
            set({ cache: {} })
        },

        updatePassword: async (email, oldPassword, newPassword) => {
            const operation = async () => {
                await userService.updatePassword(email, oldPassword, newPassword)
            }
            return withLoading(operation)
        },

        getUsers: async (page = 1, limit = 10) => {
            const operation = async () => {
                const response = await userService.getUsers(page, limit)
                return response.data
            }
            return withFetching(operation)
        },

        getUserById: async id => {
            const operation = async () => {
                const response = await userService.getUserById(id)
                return response.data
            }
            return withFetching(operation)
        },

        updateUser: async (id, updateData) => {
            const operation = async () => {
                const response = await userService.updateUser(id, updateData)
                toast.success("Данные пользователя успешно изменены")
                return response.data
            }
            return withLoading(operation)
        },

        deleteUser: async id => {
            const operation = async () => {
                await userService.deleteUser(id)
            }
            return withLoading(operation)
        },

        blockUser: async id => {
            const operation = async () => {
                await userService.blockUser(id)
            }
            return withLoading(operation)
        },

        unblockUser: async id => {
            const operation = async () => {
                await userService.unblockUser(id)
            }
            return withLoading(operation)
        },

        searchUser: async (query, page = 1, limit = 10) => {
            const operation = async () => {
                const response = await userService.searchUser(query, page, limit)
                return response.data
            }
            return withFetching(operation)
        },
    }
})
