import { envConfig } from "@/config/env-config"
import { ApiError } from "@/exceptions"
import { tokenService } from "@/services"
import { Server as HttpServer } from "http"
import { Server } from "socket.io"

let io: Server

export const initSocketIO = (httpServer: HttpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: envConfig.CLIENT_URL,
            methods: ["GET", "POST"],
            credentials: true,
        },
    })

    // Middleware для опциональной аутентификации
    // io.use((socket, next) => {
    //     const token = socket.handshake.auth.token // Получение токена из handshake, если есть
    //     if (token) {
    //         const payload = tokenService.validateAccessToken(token)
    //         if (payload) {
    //             socket.data.user = payload // Сохранение данных пользователя, если токен валиден
    //             console.log(`Аутентифицирован пользователь: ${payload.id}`)
    //         }
    //     }
    //     // Продолжение независимо от наличия токена
    //     next()
    // })

    io.on("connection", socket => {
        const userId = socket.data.user?.id || "не авторизован"
        console.log(`⚡: Новое подключение сокета (id: ${socket.id}, userId: ${userId})`)

        socket.on("join:test", (testId: string) => {
            if (!testId || typeof testId !== "string") {
                console.warn(`Некорректный testId: ${testId}`)
                socket.emit("error", { message: "Некорректный ID теста" })
                return
            }
            socket.join(testId)
            console.log(`Пользователь (id: ${userId}) присоединился к тесту: ${testId}`)
        })

         socket.on("disconnect", () => {
             // Автоматически выходим из всех комнат
             const rooms = Object.keys(socket.rooms)
             rooms.forEach(room => {
                 if (room !== socket.id) {
                     socket.leave(room)
                 }
             })
             console.log(`🔥: Пользователь отключился (id: ${socket.id}, userId: ${userId})`)
         })

        socket.on("error", error => {
            console.error(`Ошибка сокета (id: ${socket.id}):`, error)
        })
    })

    return io
}

export const getIO = () => {
    if (!io) throw ApiError.InternalError("Socket.IO не инициализирован")
    return io
}

export const closeSocketIO = () => {
    if (io) {
        io.close()
        console.log("Socket.IO сервер остановлен")
    }
}
export const emitQuestionsUpdated = (testId: string) => {
    if (io) {
        io.to(testId).emit("questions:updated", { testId })
        console.log(`Отправлено событие questions:updated для теста: ${testId}`)
    }
}