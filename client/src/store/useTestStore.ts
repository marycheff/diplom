import { testService } from "@/services/testService"
import { TestState } from "@/types/testTypes"
import { AxiosError } from "axios"
import toast from "react-hot-toast"
import { create } from "zustand"

export const useTestStore = create<TestState>(set => ({
    isTestsFetching: false,
    getTests: async (page = 1, limit = 10) => {
        try {
            set({ isTestsFetching: true })
            const response = await testService.getTests(page, limit)
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
