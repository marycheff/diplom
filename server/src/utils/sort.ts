import { PreTestUserData } from "@/types"

export const sortInputFields = (inputFields: string[]): string[] => {
    if (!inputFields?.length) return []

    const fieldOrderMap = Object.values(PreTestUserData).reduce((acc, field, index) => {
        acc[field] = index
        return acc
    }, {} as Record<string, number>)

    return [...inputFields].sort((a, b) => {
        const orderA = fieldOrderMap[a] ?? Number.MAX_SAFE_INTEGER
        const orderB = fieldOrderMap[b] ?? Number.MAX_SAFE_INTEGER
        return orderA - orderB
    })
}
