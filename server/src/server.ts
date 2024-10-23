import { PrismaClient } from "@prisma/client"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import express, { NextFunction, Request, Response } from "express"
import { createServer } from "http" // Импортируем http для создания сервера
import "module-alias/register"
import { WebSocketServer } from "ws" // Импортируем WebSocketServer
import { errorMiddleware } from "./middleware/error-middleware"
import router from "./router/router"

dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }))
app.use("/api", router)
app.use("/api/chat", router)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorMiddleware(err, req, res, next)
})

// Создаем HTTP-сервер поверх Express
const server = createServer(app)

// Инициализируем WebSocket-сервер и привязываем его к HTTP-серверу
// const wss = new WebSocketServer({ server })

// wss.on("connection", ws => {
//     console.log("Клиент подключен к WebSocket")

//     ws.send("Привет от WebSocket-сервера!")

//     ws.on("message", message => {
//         console.log(`Получено сообщение: ${message}`)
//     })

//     ws.on("close", () => {
//         console.log("Клиент отключен от WebSocket")
//     })
// })

// Запуск сервера (и HTTP, и WebSocket) на порту
const start = async () => {
    try {
        await prisma.$connect()
        server.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`)
        })
    } catch (e) {
        await prisma.$disconnect()
        process.exit(1)
    }
}

start()
