import $api from "../http";
import {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {IUser} from "../models/IUser";

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
        return $api.get<IUser>(`/user/${id}`)
    }
}

