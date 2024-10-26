import { AxiosResponse } from "axios"
import $api from "../http"
import { IUpdateUser } from "../models/IUpdateUser"
import { IUser } from "../models/IUser"
import { AuthResponse } from "../models/response/AuthResponse"

export default class UserService {
    static getUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>("/users")
    }
    static updatePassword(
        email: string,
        oldPassword: string,
        newPassword: string
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("/update-password", { email, oldPassword, newPassword })
    }

    static getUserById(id: string): Promise<AxiosResponse<IUser>> {
        return $api.get<IUser>(`/users/${id}`)
    }
    static updateUser(id: string, updateData: IUpdateUser): Promise<AxiosResponse<IUser>> {
        return $api.put<IUser>(`/users/${id}`, updateData) // Отправляем PUT запрос
    }
    static deleteUser(id: string): Promise<AxiosResponse<IUser>> {
        return $api.delete<IUser>(`/users/${id}`) // Отправляем DELETE запрос
    }
    static blockUser(id: string): Promise<AxiosResponse<IUser>> {
        return $api.post<IUser>(`/block-user/${id}`)
    }
    static unblockUser(id: string): Promise<AxiosResponse<IUser>> {
        return $api.post<IUser>(`/unblock-user/${id}`)
    }
}
