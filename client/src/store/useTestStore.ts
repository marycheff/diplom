import { createApiHandler } from "@/hooks/userStoreHelpers"
import { testService } from "@/services/testService"
import { TestState } from "@/types/testTypes"
import { create } from "zustand"

export const useTestStore = create<TestState>(set => {
    const withFetching = createApiHandler(set, "isTestsFetching")

    return {
        isTestsFetching: false,
        getTests: async (page = 1, limit = 10) => {
            const operation = async () => {
                const response = await testService.getTests(page, limit)
                return response.data
            }
            return withFetching(operation)
        },
    }
})
