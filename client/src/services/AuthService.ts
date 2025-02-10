import { AxiosResponse } from "axios"

import axiosInstance from "../http/axios"
import { AuthResponse } from "../models/response/AuthResponse"

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return axiosInstance.post<AuthResponse>("/auth/login", { email, password })
    }
    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return axiosInstance.post<AuthResponse>("/auth/registration", { email, password })
    }
    static async logout(): Promise<void> {
        return axiosInstance.post("/auth/logout")
    }
    static async updateActivationLink(email: string): Promise<AxiosResponse<AuthResponse>> {
        return axiosInstance.post<AuthResponse>("/auth/send-update-activation-link", { email })
    }
}
