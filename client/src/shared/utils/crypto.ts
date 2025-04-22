import CryptoJS from "crypto-js"

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY_ANSWER_TIME

export const encryptData = (data: string): string => {
    try {
        return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString()
    } catch (error) {
        console.error("Ошибка при шифровании данных:", error)
        return ""
    }
}

export const decryptData = (encryptedData: string): string => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY)
        return bytes.toString(CryptoJS.enc.Utf8)
    } catch (error) {
        console.error("Ошибка при дешифровании данных:", error)
        return ""
    }
}

export const saveEncryptedTime = (key: string, time: string): void => {
    try {
        const encryptedTime = encryptData(time)
        localStorage.setItem(key, encryptedTime)
    } catch (error) {
        console.error("Ошибка при сохранении зашифрованного времени:", error)
    }
}

export const getDecryptedTime = (key: string): Date => {
    try {
        const encryptedTime = localStorage.getItem(key)
        if (!encryptedTime) return new Date()

        const decryptedTime = decryptData(encryptedTime)
        return decryptedTime ? new Date(decryptedTime) : new Date()
    } catch (error) {
        console.error("Ошибка при получении расшифрованного времени:", error)
        return new Date()
    }
}
