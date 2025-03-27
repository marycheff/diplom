import { createClient } from "redis"

const redisClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
})

redisClient.on("error", err => console.log("Redis Client Error", err))

const connectRedis = async () => {
    try {
        await redisClient.connect()
        console.log("Redis connected successfully")
    } catch (error) {
        console.log("Ошибка подключения к Redis", error)
    }
}

export { connectRedis, redisClient }
