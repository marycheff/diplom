// hooks/useTestSocket.ts
import { getSocket } from "@/shared/utils/socket"
import { useEffect, useRef } from "react"

export const useTestSocket = (testId: string, onUpdate: () => void) => {
    const hasJoined = useRef(false)

    useEffect(() => {
        if (!testId) return

        const socket = getSocket()

        // Присоединяемся к комнате теста только если ещё не присоединились
        if (!hasJoined.current) {
            socket.emit("join:test", testId)
            hasJoined.current = true
        }

        const handleUpdate = (data: { testId: string }) => {
            if (data.testId === testId) {
                onUpdate()
            }
        }

        socket.on("questions:updated", handleUpdate)

        return () => {
            socket.off("questions:updated", handleUpdate)
            // Отписываемся от комнаты только при полном размонтировании
            if (hasJoined.current) {
                socket.emit("leave:test", testId)
                hasJoined.current = false
            }
        }
    }, [testId, onUpdate])
}
