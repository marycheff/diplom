import { userService } from "@/api/services/userService"
import { createApiHandler } from "@/shared/hooks/useStoreHelpers"
import { UserState, UsersListDTO } from "@/shared/types"
import toast from "react-hot-toast"
import { create } from "zustand"

const initialState = {
    isLoading: false,
    isAuthChecking: false,
    isFetching: false,
    cache: {},
    CACHE_EXPIRATION_TIME: 5 * 60 * 1000, //  5min
    lastCacheUpdateDate: null,
}
export const useUserStore = create<UserState>(set => {
    const withLoading = createApiHandler(set, "isLoading")
    const withFetching = createApiHandler(set, "isFetching")

    return {
        ...initialState,

        setCache: (key: string, data: UsersListDTO) => {
            set(state => ({
                cache: {
                    ...state.cache,
                    [key]: {
                        data,
                        timestamp: new Date(),
                    },
                },
                lastCacheUpdateDate: new Date(),
            }))
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
        createUser: async userData => {
            const operation = async () => {
                const response = await userService.createUser(userData)
                return response.data
            }
            return withLoading(operation)
        },
    }
})
