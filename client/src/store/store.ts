import axios from "axios"
import { makeAutoObservable } from "mobx"
import { API_URL } from "../http"
import { IUser } from "../models/IUser"
import { AuthResponse } from "../models/response/AuthResponse"
import AuthService from "../services/AuthService"
import UserService from "../services/UserService"

export default class Store {
    user = {} as IUser
    isAuth = false
    isLoading = false
    isAdmin = false

    private resetCodeTimestamp: number | null = null

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool
    }

    setUser(user: IUser) {
        this.user = user
    }

    setLoading(bool: boolean) {
        this.isLoading = bool
    }
    setIsAdmin(bool: boolean) {
        this.isAdmin = bool
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password)
            console.log(response)
            localStorage.setItem("token", response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password)
            console.log(response)
            localStorage.setItem("token", response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async logout() {
        try {
            await AuthService.logout()
            localStorage.removeItem("token")
            this.setAuth(false)
            this.setUser({} as IUser)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async checkAuth() {
        this.setLoading(true)
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true })
            this.setAuth(true)
            localStorage.setItem("token", response.data.accessToken)
            this.setUser(response.data.user)
            this.setIsAdmin(response.data.user.role === "ADMIN")
        } catch (e: any) {
            console.log(e.response?.data?.message)
        } finally {
            this.setLoading(false)
        }
    }
    async updatePassword(email: string, oldPassword: string, newPassword: string) {
        try {
            await UserService.updatePassword(email, oldPassword, newPassword)
            console.log("Пароль успешно обновлен")
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async requestResetCode(email: string) {
        try {
            const response = await axios.post(`${API_URL}/reset-password-request`, { email })
            this.resetCodeTimestamp = Date.now()
            return response.data
        } catch (error: any) {
            console.error(error.response?.data?.message || "Ошибка при отправке кода сброса пароля")
            throw error
        }
    }

    // Проверка времени жизни кода сброса
    private isResetCodeValid(): boolean {
        if (!this.resetCodeTimestamp) {
            return false
        }
        const currentTime = Date.now()

        return (
            currentTime - this.resetCodeTimestamp <
            Number((import.meta as any).env.VITE_RESET_PASSWORD_TIMEOUT_MINUTES || 5) * 60 * 1000
        )
    }

    // Проверка кода сброса пароля
    async verifyResetCode(email: string, code: string) {
        if (!this.isResetCodeValid()) {
            throw new Error("Срок действия кода сброса истек. Пожалуйста, запросите новый код.")
        }
        try {
            const response = await axios.post(`${API_URL}/verify-reset-code`, { email, code })
            return response.data
        } catch (error: any) {
            console.error(error.response?.data?.message || "Ошибка при подтверждении кода сброса пароля")
            throw error
        }
    }

    // Сброс пароля
    async resetPassword(email: string, code: string, newPassword: string) {
        if (!this.isResetCodeValid()) {
            throw new Error("Срок действия кода сброса истек. Пожалуйста, запросите новый код.")
        }
        try {
            const response = await axios.post(`${API_URL}/reset-password`, { email, code, newPassword })
            this.resetCodeTimestamp = null // Обнуляем время, так как код уже использован
            return response.data
        } catch (error: any) {
            console.error(error.response?.data?.message || "Ошибка при сбросе пароля")
            throw error
        }
    }
    async getUsers() {
        try {
            const response = await UserService.getUsers()
            return response.data
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }
}
