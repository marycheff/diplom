import { errorMiddleware } from "@/middleware/error.middleware"
import authRoutes from "@/routes/auth.routes"
import chatRoutes from "@/routes/chat.routes"
import testRoutes from "@/routes/test.routes"
import userRoutes from "@/routes/user.routes"
import { connectRedis } from "@/utils/redis-client"
import { PrismaClient } from "@prisma/client"
import { parse } from "cookie"
import cors from "cors"
import dotenv from "dotenv"
import express, { NextFunction, Request, Response } from "express"
import "module-alias/register"
import envConfig from "./config/envConfig"

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
        app.listen(PORT, "0.0.0.0", () => console.log(`✓ Сервер запущен. Порт ${PORT}`))
    } catch (error) {
        await prisma.$disconnect()
        console.error("Failed to start the server", error)
        process.exit(1)
    }
}

start()

export default app
