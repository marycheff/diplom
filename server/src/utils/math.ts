import { ACTIVATION_LINK_LIFETIME_HOURS, RESET_CODE_LIFETIME_MINUTES } from "@/utils/constants"
export const generateCode = (): string => {
    const min = 100000 // 6 цифр
    const max = 999999 // 6 цифр
    const code = Math.floor(Math.random() * (max - min + 1)) + min
    return code.toString()
}
export const getActivationLinkExpDate = (): Date => {
    const expirationDate = new Date()
    expirationDate.setHours(expirationDate.getHours() + ACTIVATION_LINK_LIFETIME_HOURS)
    return expirationDate
}
export const getResetCodeExpDate = (): Date => {
    const expirationDate = new Date()
    expirationDate.setMinutes(expirationDate.getMinutes() + RESET_CODE_LIFETIME_MINUTES)
    return expirationDate
}
