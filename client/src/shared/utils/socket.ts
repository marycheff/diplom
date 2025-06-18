import { io, Socket } from "socket.io-client"

// Правильное формирование URL для Socket.IO
const SOCKET_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000"

let socket: Socket | null = null

export const initSocket = () => {
	if (!socket) {
		const token = localStorage.getItem("token")

		socket = io(SOCKET_URL, {
			path: "/socket.io/",
			withCredentials: true,
			auth: token ? { token } : {},
			// Добавляем дополнительные опции для продакшена
			transports: ["websocket", "polling"],
			upgrade: true,
			rememberUpgrade: true,
			timeout: 20000,
			forceNew: false,
			reconnection: true,
			reconnectionDelay: 1000,
			reconnectionAttempts: 5,
		})

		// Логирование событий подключения
		socket.on("connect", () => {
			console.log("Socket подключен:", socket?.id)
		})

		socket.on("disconnect", (reason) => {
			console.log("Socket отключен:", reason)
		})

		socket.on("connect_error", (error) => {
			console.error("Ошибка подключения Socket:", error)
		})
	}
	return socket
}

export const getSocket = () => {
	if (!socket) throw new Error("Сокет не инициализирован")
	return socket
}

export const closeSocket = () => {
	if (socket) {
		socket.disconnect()
		socket = null
	}
}
