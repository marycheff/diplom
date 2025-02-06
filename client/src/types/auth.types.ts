import { AuthResponse } from "@/models/response/AuthResponse"

export interface AuthState {
    user: any
    isAuth: boolean
    isAuthChecking: boolean
    isLoading: boolean
    isAdmin: boolean
    login: (email: string, password: string) => Promise<void>
    registration: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    checkAuth: () => Promise<void>
    noLoadingCheckAuth: () => Promise<void>
    updateActivationLink: (email: string) => Promise<AuthResponse>
}

export interface ResetPasswordState {
    isLoading: boolean
    resetCodeTimestamp: number | null
    requestResetCode: (email: string) => Promise<any>
    verifyResetCode: (email: string, code: string) => Promise<any>
    resetPassword: (email: string, code: string, newPassword: string) => Promise<any>
    isResetCodeValid: () => boolean
}
