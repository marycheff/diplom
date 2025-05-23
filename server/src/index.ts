import { envConfig } from "@/config/env-config"
import { initializeJobs, shutdownJobs } from "@/jobs"
import { errorMiddleware } from "@/middleware/error.middleware"
import { authRoutes, chatRoutes, testRoutes, userRoutes } from "@/routes"
import { logger } from "@/utils/logger"
import { connectRedis, disconnectRedis } from "@/utils/redis-client"
import { PrismaClient } from "@prisma/client"
import { parse } from "cookie"
import cors from "cors"
import dotenv from "dotenv"
import express, { NextFunction, Request, Response } from "express"
import "module-alias/register"

dotenv.config()

const PORT = envConfig.PORT
const app = express()
const prisma = new PrismaClient()

app.use(express.json({ limit: "1mb" }))
app.use((req: Request, res: Response, next: NextFunction) => {
    req.cookies = req.headers.cookie ? parse(req.headers.cookie) : {}
    next()
})

app.use(
    cors({
        credentials: true,
        origin: envConfig.CLIENT_URL,
        // origin: envConfig.ALLOWED_ORIGINS!.split(","),
    })
)
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/tests", testRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorMiddleware(err, req, res, next)
})
app.get("/", (req: Request, res: Response) => {
    res.send("Сервер работает")
})

const start = async () => {
    try {
        await connectRedis()
        await prisma.$connect()
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`✓ Сервер запущен. Порт ${PORT}`)
            logger.info(`Сервер запущен на порту ${PORT} в режиме ${envConfig.NODE_ENV}`)

            // Запускаем запланированные задачи после успешного старта сервера
            initializeJobs()
        })
    } catch (error) {
        await prisma.$disconnect()
        console.error("Failed to start the server", error)
        process.exit(1)
    }
}

start()

// Обработка сигналов завершения для graceful shutdown
process.on("SIGTERM", () => {
    logger.info("Получен сигнал SIGTERM, завершение работы...")
    gracefulShutdown()
})

process.on("SIGINT", () => {
    logger.info("Получен сигнал SIGINT, завершение работы...")
    gracefulShutdown()
})

/**
 * Функция для корректного завершения работы сервера
 */
const gracefulShutdown = async (): Promise<void> => {
    logger.info("Начало процесса graceful shutdown...")

    try {
        // Останавливаем все фоновые задачи
        shutdownJobs()

        logger.info("Закрытие соединения с Redis...")
        await disconnectRedis()

        logger.info("Закрытие соединения с базой данных...")
        await prisma.$disconnect()

        logger.info("Сервер успешно остановлен")
        process.exit(0)
    } catch (error) {
        logger.error("Ошибка при остановке сервера:", error)
        process.exit(1) // Завершаем процесс с кодом ошибки
    }
}

export default app
