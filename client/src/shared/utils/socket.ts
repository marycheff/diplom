import { io, Socket } from "socket.io-client"

const SOCKET_URL = import.meta.env.VITE_SERVER_URL

let socket: Socket | null = null

export const initSocket = () => {
	if (!socket) {
		const token = localStorage.getItem("token") // Получение токена из localStorage
		socket = io({
			path: "/socket.io/",
			withCredentials: true,
			auth: token ? { token } : {},
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
