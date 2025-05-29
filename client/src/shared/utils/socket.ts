import { io, Socket } from "socket.io-client"

const SOCKET_URL = import.meta.env.VITE_SERVER_URL

let socket: Socket | null = null

export const initSocket = () => {
    if (!socket) {
        socket = io(SOCKET_URL, {
            withCredentials: true,
        })
    }
    return socket
}

export const getSocket = () => {
    if (!socket) throw new Error("Socket not initialized")
    return socket
}

export const closeSocket = () => {
    if (socket) {
        socket.disconnect()
        socket = null
    }
}
