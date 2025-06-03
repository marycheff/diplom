import { envConfig } from "@/config/env-config"
import { ApiError } from "@/exceptions"
import { logger } from "@/utils/logger"
import axios from "axios"
import { Agent as HttpsAgent } from "node:https"
import qs from "querystring"

const LOG_NAMESPACE = "GigaChatTokenService"

class GigaChatTokenService {
	httpsAgent = new HttpsAgent({ rejectUnauthorized: false })

	getAccessToken = async (authData: string): Promise<string> => {
		logger.debug(`[${LOG_NAMESPACE}] Запрос токена GigaChat`)

		const postData = qs.stringify({ scope: "GIGACHAT_API_PERS" })

		const config = {
			method: "POST",
			url: envConfig.GIGACHAT_AUTH_URL,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Accept: "application/json",
				RqUID: crypto.randomUUID(),
				Authorization: `Bearer ${authData}`,
			},
			data: postData,
			httpsAgent: this.httpsAgent,
		}

		try {
			const { data } = await axios(config)
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

export const gigaChatTokenService = new GigaChatTokenService()
