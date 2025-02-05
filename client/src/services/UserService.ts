import { AxiosResponse } from "axios"
import axiosInstance from "../http/axios"
import { IUpdateUser } from "../models/IUpdateUser"
import { IUser } from "../models/IUser"
import { AuthResponse } from "../models/response/AuthResponse"
import { UserDto } from "@/types/user.types"

export default class UserService {
    static getUsers(): Promise<AxiosResponse<IUser[]>> {
        return axiosInstance.get<IUser[]>("/users")
    }

    static updatePassword(
        email: string,
        oldPassword: string,
        newPassword: string
    ): Promise<AxiosResponse<AuthResponse>> {
        return axiosInstance.post<AuthResponse>("/auth/update-password", { email, oldPassword, newPassword })
    }

    static getUserById(id: string): Promise<AxiosResponse<IUser>> {
        return axiosInstance.get<IUser>(`/users/${id}`)
    }

    static updateUser(id: string, updateData: IUpdateUser): Promise<AxiosResponse<UserDto>> {
        return axiosInstance.put<IUser>(`/users/update-profile/${id}`, updateData)
    }

    static deleteUser(id: string): Promise<AxiosResponse<IUser>> {
        return axiosInstance.delete<IUser>(`/users/${id}`)
    }

    static blockUser(id: string): Promise<AxiosResponse<IUser>> {
        return axiosInstance.post<IUser>(`/users/block/${id}`)
    }

    static unblockUser(id: string): Promise<AxiosResponse<IUser>> {
        return axiosInstance.post<IUser>(`/users/unblock/${id}`)
    }
}
