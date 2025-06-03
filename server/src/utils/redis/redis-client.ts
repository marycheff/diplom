import { envConfig } from "@/config/env-config"
import { createClient } from "redis"

// Состояние подключения
let isConnected = false
let connectionAttempts = 0
const MAX_CONNECTION_ATTEMPTS = 3

const redisClient = createClient({
	url: envConfig.REDIS_URL,
})

// Флаг для отслеживания показа ошибки
let errorLogged = false

redisClient.on("error", (err) => {
	if (!errorLogged) {
		console.error("Ошибка подключения к Redis:", err.message)
		errorLogged = true

		// Сброс флага через 5 секунд для новых попыток
		setTimeout(() => {
			errorLogged = false
		}, 5000)
	}
})

redisClient.on("connect", () => {
	isConnected = true
	console.log("Подключение к Redis выполнено успешно.")
})

redisClient.on("reconnecting", () => {
	console.log("Повторное подключение к Redis...")
})

const connectRedis = async () => {
	if (isConnected) return

	try {
		await redisClient.connect()
	} catch (error) {
		connectionAttempts++

		if (connectionAttempts >= MAX_CONNECTION_ATTEMPTS) {
			console.error(
				`Не удалось подключиться к Redis после ${MAX_CONNECTION_ATTEMPTS} попыток. ` +
					"Приложение продолжит работу без кэширования Redis."
			)
		} else {
			// Повторная попытка через 2 секунды
			setTimeout(connectRedis, 2000)
		}
	}
}

const disconnectRedis = async () => {
	if (isConnected) {
		try {
			await redisClient.quit()
			isConnected = false
			console.log("Отключение от Redis выполнено успешно.")
		} catch (error) {
			console.error("Ошибка при отключении от Redis:", error)
		}
	}
}

export { connectRedis, disconnectRedis, redisClient }
