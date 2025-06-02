import { authService } from "@/api/services/authService"
import { createApiHandler } from "@/shared/hooks/useStoreHelpers"
import { ResetPasswordState } from "@/shared/types"
import { RESET_PASSWORD_TIMEOUT_MINUTES } from "@/shared/utils/constants"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"
import { create } from "zustand"

const initialState = {
	resetCodeTimestamp: null,
	isLoading: false,
}

export const useResetPasswordStore = create<ResetPasswordState>((set, get) => {
	const withLoading = createApiHandler(set, "isLoading")

	return {
		...initialState,

		requestResetCode: async (email) => {
			const operation = async () => {
				const response = await authService.requestResetCode(email)
				set({ resetCodeTimestamp: Date.now() })
				return response.data
			}
			return withLoading(operation)
		},

		verifyResetCode: async (email, code) => {
			const operation = async () => {
				if (!get().isResetCodeValid()) {
					throw new Error("Срок действия кода сброса истек. Пожалуйста, запросите новый код.")
				}
				const response = await authService.verifyResetCode(email, code)
				return response.data
			}
			return withLoading(operation)
		},

		resetPassword: async (email, code, newPassword) => {
			const operation = async () => {
				if (!get().isResetCodeValid()) {
					toast.error("Срок действия кода сброса истек. Пожалуйста, запросите новый код.")
					throw new Error()
				}
				const response = await authService.resetPassword(email, code, newPassword)
				set({ resetCodeTimestamp: null })
				return response.data
			}
			return withLoading(operation)
		},

		isResetCodeValid: () => {
			const { resetCodeTimestamp } = get()
			if (!resetCodeTimestamp) {
				return false
			}
			const currentTime = Date.now()
			return currentTime - resetCodeTimestamp < RESET_PASSWORD_TIMEOUT_MINUTES * 60 * 1000
		},
	}
})
