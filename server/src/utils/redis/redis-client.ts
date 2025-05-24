import { createClient } from "redis"

// Состояние подключения
let isConnected = false
let connectionAttempts = 0
const MAX_CONNECTION_ATTEMPTS = 3

const redisClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
})

// Флаг для отслеживания показа ошибки
let errorLogged = false

redisClient.on("error", err => {
    if (!errorLogged) {
        console.error("Redis connection error:", err.message)
        errorLogged = true

        // Сброс флага через 5 секунд для новых попыток
        setTimeout(() => {
            errorLogged = false
        }, 5000)
    }
})

redisClient.on("connect", () => {
    isConnected = true
    console.log("Redis connected successfully")
})

redisClient.on("reconnecting", () => {
    console.log("Redis reconnecting...")
})

const connectRedis = async () => {
    if (isConnected) return

    try {
        await redisClient.connect()
    } catch (error) {
        connectionAttempts++

        if (connectionAttempts >= MAX_CONNECTION_ATTEMPTS) {
            console.error(
                `Failed to connect to Redis after ${MAX_CONNECTION_ATTEMPTS} attempts. ` +
                    "Application will continue without Redis caching."
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
            console.log("Redis disconnected successfully")
        } catch (error) {
            console.error("Error disconnecting from Redis:", error)
        }
    }
}

export { connectRedis, disconnectRedis, redisClient }
