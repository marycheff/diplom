import { getSocket } from "@/shared/utils/socket"
import { useCallback, useEffect } from "react"

export const useTestSocket = (testId: string, onUpdate: () => void) => {
    // Эффект для присоединения и покидания комнаты
    useEffect(() => {
        if (!testId) return
        const socket = getSocket()
        socket.emit("join:test", testId)
        return () => {
            socket.emit("leave:test", testId)
        }
    }, [testId])

    // Мемоизация обработчика события
    const handleUpdate = useCallback(
        (data: { testId: string }) => {
            if (data.testId === testId) {
                onUpdate()
            }
        },
        [testId, onUpdate]
    )

    // Эффект для установки слушателя события
    useEffect(() => {
        const socket = getSocket()
        socket.on("questions:updated", handleUpdate)
        return () => {
            socket.off("questions:updated", handleUpdate)
        }
    }, [handleUpdate])
}
