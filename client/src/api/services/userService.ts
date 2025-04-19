import axiosInstance from "@/api"
import { AuthResponse, UpdateUser, UserDTO, UsersListDTO } from "@/shared/types"
import { AxiosResponse } from "axios"

class UserService {
    getUsers(page = 1, limit = 10): Promise<AxiosResponse<UsersListDTO>> {
        return axiosInstance.get<UsersListDTO>("/users", {
            params: {
                page,
                limit,
            },
        })
    }

    updatePassword(email: string, oldPassword: string, newPassword: string): Promise<AxiosResponse<AuthResponse>> {
        return axiosInstance.post<AuthResponse>("/auth/update-password", { email, oldPassword, newPassword })
    }

    getUserById(id: string): Promise<AxiosResponse<UserDTO>> {
        return axiosInstance.get<UserDTO>(`/users/${id}`)
    }

    updateUser(id: string, updateData: UpdateUser): Promise<AxiosResponse<UserDTO>> {
        return axiosInstance.put<UserDTO>(`/users/update-profile/${id}`, updateData)
    }

    deleteUser(id: string): Promise<AxiosResponse<UserDTO>> {
        return axiosInstance.delete<UserDTO>(`/users/${id}`)
    }

    blockUser(id: string): Promise<AxiosResponse<UserDTO>> {
        return axiosInstance.post<UserDTO>(`/users/block/${id}`)
    }

    unblockUser(id: string): Promise<AxiosResponse<UserDTO>> {
        return axiosInstance.post<UserDTO>(`/users/unblock/${id}`)
    }
    searchUser(query: string, page = 1, limit = 10): Promise<AxiosResponse<UsersListDTO>> {
        return axiosInstance.get<UsersListDTO>("/users/search", {
            params: {
                query,
                page,
                limit,
            },
        })
    }
}

export const userService = new UserService()
