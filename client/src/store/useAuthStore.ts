import { API_URL } from "@/http/axios"
import { AuthResponse } from "@/models/response/AuthResponse"
import AuthService from "@/services/AuthService"
import { AuthState } from "@/types/auth.types"
import axios from "axios"
import { create } from "zustand"

export const useAuthStore = create<AuthState>(set => ({
    user: {},
    isAuth: false,
    isLoading: false,
    isAdmin: false,

    login: async (email, password) => {
        set({ isLoading: true })
        try {
            const response = await AuthService.login(email, password)
            localStorage.setItem("token", response.data.accessToken)
            set({
                user: response.data.user,
                isAuth: true,
                isAdmin: response.data.user.role === "ADMIN",
            })
        } catch (e: any) {
            console.log(e.response?.data?.message)
        } finally {
            set({ isLoading: false })
        }
    },

    registration: async (email, password) => {
        set({ isLoading: true })
        try {
            const response = await AuthService.registration(email, password)
            localStorage.setItem("token", response.data.accessToken)
            set({
                user: response.data.user,
                isAuth: true,
            })
        } catch (e: any) {
            console.log(e.response?.data?.message)
        } finally {
            set({ isLoading: false })
        }
    },

    logout: async () => {
        try {
            await AuthService.logout()
            localStorage.removeItem("token")
            set({
                user: {},
                isAuth: false,
            })
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    },

    checkAuth: async () => {
        set({ isLoading: true })
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, { withCredentials: true })
            localStorage.setItem("token", response.data.accessToken)
            set({
                user: response.data.user,
                isAuth: true,
                isAdmin: response.data.user.role === "ADMIN",
            })
        } catch (e: any) {
            console.log(e.response?.data?.message || e.message)
        } finally {
            set({ isLoading: false })
        }
    },

    noLoadingCheckAuth: async () => {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, { withCredentials: true })
            localStorage.setItem("token", response.data.accessToken)
            set({
                user: response.data.user,
                isAuth: true,
                isAdmin: response.data.user.role === "ADMIN",
            })
        } catch (e: any) {
            console.log(e.response?.data?.message || e.message)
        }
    },
}))
