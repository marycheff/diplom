import { envConfig } from "@/config/env-config"
export const generateCode = (): string => {
    const min = 100000 // 6 цифр
    const max = 999999 // 6 цифр
    const code = Math.floor(Math.random() * (max - min + 1)) + min
    return code.toString()
}
export const getActivationLinkExpDate = (): Date => {
    const expirationDate = new Date()
    expirationDate.setHours(expirationDate.getHours() + Number(envConfig.ACTIVATION_LINK_LIFETIME_HOURS) || 24)
    return expirationDate
}
export const getResetCodeExpDate = (): Date => {
    const expirationDate = new Date()
    expirationDate.setMinutes(expirationDate.getMinutes() + Number(envConfig.RESET_CODE_LIFETIME_MINUTES) || 10)
    return expirationDate
}
