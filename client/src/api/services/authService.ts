import axiosInstance from "@/api"
import { AuthResponse } from "@/shared/types"
import { AxiosResponse } from "axios"
import toast from "react-hot-toast"

class AuthService {
    async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return axiosInstance.post<AuthResponse>("/auth/login", { email, password })
    }
    async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return axiosInstance.post<AuthResponse>("/auth/registration", { email, password })
    }
    async logout(): Promise<void> {
        try {
            await axiosInstance.post("/auth/logout")
            localStorage.removeItem("token")
        } catch (error) {
            toast.error("Ошибка при выходе из аккаунта")
        }
    }
    async updateActivationLink(email: string): Promise<AxiosResponse<AuthResponse>> {
        return axiosInstance.post<AuthResponse>("/auth/send-update-activation-link", { email })
    }
    async checkAuth(): Promise<AxiosResponse<AuthResponse>> {
        return axiosInstance.get<AuthResponse>("/auth/refresh")
    }
}

export const authService = new AuthService()
