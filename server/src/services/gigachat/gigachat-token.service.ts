import ApiError from "@/exceptions/api-error"
import axios from "axios"
import qs from "querystring"
import https from "follow-redirects/https" 

const httpsAgent = new https.Agent({ rejectUnauthorized: false })

const getRandomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min

const generateUUID = (): string =>
    "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        const r = getRandomInt(0, 15)
        const v = c === "x" ? r : (r & 0x3) | 0x8
        return v.toString(16) 
    })

export const getAccessToken = async (authData: string): Promise<string> => {
    const postData = qs.stringify({ scope: "GIGACHAT_API_PERS" })

    const config = {
        method: "POST",
        url: "https://ngw.devices.sberbank.ru:9443/api/v2/oauth",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            RqUID: generateUUID(),
            Authorization: `Bearer ${authData}`,
        },
        data: postData,
        httpsAgent,
    }

    try {
        const { data } = await axios(config)
        if (data?.access_token) {
            return data.access_token
        }
        throw ApiError.InternalError("Ошибка нейросети")
    } catch (error) {
        throw ApiError.InternalError("Ошибка получения токена доступа")
    }
}
