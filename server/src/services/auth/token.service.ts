import { envConfig } from "@/config/env-config"
import { tokenRepository } from "@/repositories"
import { logger } from "@/utils/logger"
import { Token } from "@prisma/client"
import jwt, { JwtPayload } from "jsonwebtoken"

const LOG_NAMESPACE = "TokenService"

class TokenService {
	generateTokens(payload: object): { accessToken: string; refreshToken: string } {
		logger.debug(`[${LOG_NAMESPACE}] Генерация токенов`)
		const accessToken = jwt.sign(payload, envConfig.JWT_ACCESS_SECRET, {
			expiresIn: "29d",
			// expiresIn: "15s",
		})
		const refreshToken = jwt.sign(payload, envConfig.JWT_REFRESH_SECRET, {
			// expiresIn: "30s",
			expiresIn: "30d",
		})
		logger.debug(`[${LOG_NAMESPACE}] Токены успешно сгенерированы`)
		return { accessToken, refreshToken }
	}

	async saveToken(userId: string, refreshToken: string): Promise<Token> {
		logger.debug(`[${LOG_NAMESPACE}] Сохранение токена`, { userId })
		try {
			const token = await tokenRepository.upsert(userId, refreshToken)
			logger.debug(`[${LOG_NAMESPACE}] Токен успешно сохранен`, { userId })
			return token
		} catch (error) {
			logger.error(`[${LOG_NAMESPACE}] Ошибка при сохранении токена`, {
				userId,
				error: error instanceof Error ? error.message : String(error),
				stack: error instanceof Error ? error.stack : undefined,
			})
			throw error
		}
	}

	async removeToken(refreshToken: string): Promise<Token> {
		logger.debug(`[${LOG_NAMESPACE}] Удаление токена`)
		try {
			const token = await tokenRepository.delete(refreshToken)
			logger.debug(`[${LOG_NAMESPACE}] Токен успешно удален`, { userId: token.userId })
			return token
		} catch (error) {
			logger.error(`[${LOG_NAMESPACE}] Ошибка при удалении токена`, {
				error: error instanceof Error ? error.message : String(error),
				stack: error instanceof Error ? error.stack : undefined,
			})
			throw error
		}
	}

	validateAccessToken(token: string): JwtPayload | null {
		logger.debug(`[${LOG_NAMESPACE}] Валидация access токена`)
		try {
			const result = jwt.verify(token, envConfig.JWT_ACCESS_SECRET)
			logger.debug(`[${LOG_NAMESPACE}] Access токен успешно валидирован`)
			return result as JwtPayload
		} catch (e) {
			logger.warn(`[${LOG_NAMESPACE}] Ошибка валидации access токена`, {
				error: e instanceof Error ? e.message : String(e),
			})
			return null
		}
	}

	validateRefreshToken(token: string): JwtPayload | null {
		logger.debug(`[${LOG_NAMESPACE}] Валидация refresh токена`)
		try {
			const result = jwt.verify(token, envConfig.JWT_REFRESH_SECRET)
			logger.debug(`[${LOG_NAMESPACE}] Refresh токен успешно валидирован`)
			return result as JwtPayload
		} catch (e) {
			logger.warn(`[${LOG_NAMESPACE}] Ошибка валидации refresh токена`, {
				error: e instanceof Error ? e.message : String(e),
			})
			return null
		}
	}

	async findToken(refreshToken: string): Promise<Token | null> {
		logger.debug(`[${LOG_NAMESPACE}] Поиск токена`)
		try {
			const token = await tokenRepository.findByToken(refreshToken)
			logger.debug(`[${LOG_NAMESPACE}] Токен найден`, { found: !!token })
			return token
		} catch (error) {
			logger.error(`[${LOG_NAMESPACE}] Ошибка при поиске токена`, {
				error: error instanceof Error ? error.message : String(error),
				stack: error instanceof Error ? error.stack : undefined,
			})
			throw error
		}
	}
}

export const tokenService = new TokenService()
