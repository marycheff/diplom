import { testService } from "@/services/testService"
import { TestState } from "@/types/test.types"
import { AxiosError } from "axios"
import toast from "react-hot-toast"
import { create } from "zustand"

export const useTestStore = create<TestState>(set => ({
    isTestsFetching: false,
    getTests: async () => {
        try {
            set({ isTestsFetching: true })
            const response = await testService.getTests()
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "Неизвестная ошибка")
            } else {
                toast.error("Неизвестная ошибка, перезагрузите страницу")
            }
        } finally {
            set({ isTestsFetching: false })
        }
    },
}))
