import { envConfig } from "@/config/env-config"
import ApiError from "@/exceptions/api-error"
import { generateUUID } from "@/utils/math"
import { logger } from "@/utils/logger"
import axios from "axios"
import https from "follow-redirects/https"
import qs from "querystring"

const LOG_NAMESPACE = "GigaChatTokenService"

class GigaChatTokenService {
    httpsAgent = new https.Agent({ rejectUnauthorized: false })

    getAccessToken = async (authData: string): Promise<string> => {
        logger.debug(`[${LOG_NAMESPACE}] Запрос токена GigaChat`)

        const postData = qs.stringify({ scope: "GIGACHAT_API_PERS" })

        const config = {
            method: "POST",
            url: envConfig.GIGACHAT_AUTH_URL,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json",
                RqUID: generateUUID(),
                Authorization: `Bearer ${authData}`,
            },
            data: postData,
            httpsAgent: this.httpsAgent,
        }

        try {
            const { data } = await axios(config)
            logger.debug(`[${LOG_NAMESPACE}] Ответ от GigaChat: ${JSON.stringify(data)}`)

            if (data?.access_token) {
                logger.debug(`[${LOG_NAMESPACE}] Токен успешно получен`)
                return data.access_token
            }

            throw ApiError.InternalError("Ошибка нейросети")
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка получения токена: ${error}`)
            throw ApiError.InternalError("Ошибка получения токена доступа")
        }
    }
}

export default new GigaChatTokenService()
