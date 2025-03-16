import { AuthResponse } from "@/types/authTypes"
import { UpdateUser, UserDTO } from "@/types/userTypes"
import { AxiosResponse } from "axios"
import axiosInstance from "../axios/axios"

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

export const userService = new UserService()
