import { envConfig } from "@/config/env-config"
import { ApiError } from "@/exceptions"
import { tokenService } from "@/services"
import { Server as HttpServer } from "http"
import { Server } from "socket.io"

let io: Server

export const initSocketIO = (httpServer: HttpServer) => {
	io = new Server(httpServer, {
		path: "/socket.io/",
		cors: {
			origin: envConfig.CLIENT_URL,
			methods: ["GET", "POST"],
			credentials: true,
		},
	
		transports: ["websocket", "polling"],
		allowEIO3: true,
		pingTimeout: 60000,
		pingInterval: 25000,
		upgradeTimeout: 30000,
		maxHttpBufferSize: 1e6,
		// Настройки для работы за прокси
		allowRequest: (req, callback) => {
			
			console.log("Socket.IO request:", {
				origin: req.headers.origin,
				referer: req.headers.referer,
				userAgent: req.headers["user-agent"],
			})
			callback(null, true)
		},
	})

	// Middleware для опциональной аутентификации
	io.use((socket, next) => {
		console.log("Socket.IO middleware:", {
			id: socket.id,
			handshake: {
				auth: socket.handshake.auth,
				headers: {
					origin: socket.handshake.headers.origin,
					referer: socket.handshake.headers.referer,
				},
			},
		})

		const token = socket.handshake.auth.token
		if (token) {
			try {
				const payload = tokenService.validateAccessToken(token)
				if (payload) {
					socket.data.user = payload
					console.log(`✅ Аутентифицирован пользователь: ${payload.id}`)
				}
			} catch (error) {
				console.warn(`⚠️ Ошибка валидации токена:`, error)
			}
		}
		next()
	})

	io.on("connection", (socket) => {
		const userId = socket.data.user?.id || "не авторизован"
		console.log(`🔌 Новое подключение сокета (id: ${socket.id}, userId: ${userId})`)

		// Отправляем подтверждение подключения
		socket.emit("connected", {
			socketId: socket.id,
			timestamp: new Date().toISOString(),
		})

		socket.on("join:test", (testId: string) => {
			if (!testId || typeof testId !== "string") {
				console.warn(`❌ Некорректный testId: ${testId}`)
				socket.emit("error", { message: "Некорректный ID теста" })
				return
			}
			socket.join(testId)
			console.log(`✅ Пользователь (id: ${userId}) присоединился к тесту: ${testId}`)

			// Подтверждаем успешное присоединение к комнате
			socket.emit("joined:test", { testId, socketId: socket.id })
		})

		socket.on("disconnect", (reason) => {
			const rooms = Object.keys(socket.rooms)
			rooms.forEach((room) => {
				if (room !== socket.id) {
					socket.leave(room)
				}
			})
			console.log(`🔌 Пользователь отключился (id: ${socket.id}, userId: ${userId}, reason: ${reason})`)
		})

		socket.on("error", (error) => {
			console.error(`❌ Ошибка сокета (id: ${socket.id}):`, error)
		})

		// Добавляем ping-pong для проверки соединения
		socket.on("ping", () => {
			socket.emit("pong", { timestamp: new Date().toISOString() })
		})
	})

	// Логируем события сервера
	io.engine.on("connection_error", (err) => {
		console.error("❌ Socket.IO connection error:", err)
	})

	console.log("🚀 Socket.IO сервер инициализирован")
	return io
}

export const getIO = () => {
	if (!io) throw ApiError.InternalError("Socket.IO не инициализирован")
	return io
}

export const closeSocketIO = () => {
	if (io) {
		io.close()
		console.log("🛑 Socket.IO сервер остановлен")
	}
}

export const emitQuestionsUpdated = (testId: string) => {
	if (io) {
		const room = io.sockets.adapter.rooms.get(testId)
		const clientsCount = room ? room.size : 0

		io.to(testId).emit("questions:updated", { testId })
		console.log(`📤 Отправлено событие questions:updated для теста: ${testId} (клиентов: ${clientsCount})`)
	}
}

export const emitSettingsUpdated = (testId: string) => {
	if (io) {
		const room = io.sockets.adapter.rooms.get(testId)
		const clientsCount = room ? room.size : 0

		io.to(testId).emit("settings:updated", { testId })
		console.log(`📤 Отправлено событие settings:updated для теста: ${testId} (клиентов: ${clientsCount})`)
	}
}
