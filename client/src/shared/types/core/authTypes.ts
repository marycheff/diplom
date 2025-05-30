import { UserDTO } from "@/shared/types"

export interface AuthState {
	user: UserDTO | null
	isAuth: boolean
	isAuthChecking: boolean
	isLoading: boolean
	isAdmin: boolean
	isEmailSending: boolean
	login: (email: string, password: string) => Promise<void>
	registration: (email: string, password: string) => Promise<void>
	logout: () => Promise<void>
	checkAuth: () => Promise<void>
	updateActivationLink: (email: string) => Promise<AuthResponse | undefined>
}

export interface ResetPasswordState {
	isLoading: boolean
	resetCodeTimestamp: number | null
	requestResetCode: (email: string) => Promise<void>
	verifyResetCode: (email: string, code: string) => Promise<void>
	resetPassword: (email: string, code: string, newPassword: string) => Promise<void>
	isResetCodeValid: () => boolean
}

export interface AuthResponse {
	accessToken: string
	refreshToken: string
	user: UserDTO
}
