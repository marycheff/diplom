import { UpdateUser, UserDTO } from "@/types/user.types"
import { AxiosResponse } from "axios"
import axiosInstance from "../http/axios"
import { AuthResponse } from "@/types/auth.types"

class UserService {
    getUsers(): Promise<AxiosResponse<UserDTO[]>> {
        return axiosInstance.get<UserDTO[]>("/users")
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
}

export const userService = new UserService ()
