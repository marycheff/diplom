import { decryptData, encryptData } from "@/shared/utils/crypto"
import { formatSeconds } from "@/shared/utils/formatter"
import { useCallback, useEffect, useState } from "react"
import styles from "./TestTimer.module.scss"

interface TestTimerProps {
    attemptId: string
    defaultTime: number
    onTimeExpired: () => void
    isActive?: boolean
}

const TestTimer = ({ attemptId, defaultTime, onTimeExpired, isActive = true }: TestTimerProps) => {
    const [timeRemaining, setTimeRemaining] = useState(defaultTime)
    const [timerActive, setTimerActive] = useState(isActive)
    const [initialized, setInitialized] = useState(false)

    // Сохранение времени в localStorage
    const saveTime = useCallback(
        (time: number) => {
            if (time > 0) {
                try {
                    const encryptedTime = encryptData(time.toString())
                    localStorage.setItem(`test_time_${attemptId}`, encryptedTime)
                } catch (error) {
                    console.error("Ошибка при сохранении времени:", error)
                }
            }
        },
        [attemptId]
    )

    // Загрузка сохраненного времени
    const loadSavedTime = useCallback(() => {
        try {
            const encryptedTime = localStorage.getItem(`test_time_${attemptId}`)
            if (encryptedTime) {
                const decryptedTime = decryptData(encryptedTime)
                if (decryptedTime) {
                    const parsedTime = parseInt(decryptedTime, 10)
                    if (!isNaN(parsedTime)) {
                        if (parsedTime > 0) {
                            setTimeRemaining(parsedTime)
                        } else {
                            setTimeRemaining(0)
                            setTimerActive(false)
                            onTimeExpired()
                        }
                        return true
                    }
                }
                // Если дешифрование не удалось (например, данные изменены), возвращаем 0
                setTimeRemaining(0)
                localStorage.removeItem(`test_time_${attemptId}`)
                setTimerActive(false)
                onTimeExpired()
                return true
            }
            return false
        } catch (error) {
            console.error("Ошибка при загрузке сохраненного времени:", error)
            return false
        }
    }, [attemptId, onTimeExpired])

    // Инициализация при монтировании
    useEffect(() => {
        const hasLoadedTime = loadSavedTime()
        if (!hasLoadedTime) {
            setTimeRemaining(defaultTime)
            saveTime(defaultTime)
        }
        setInitialized(true)
    }, [defaultTime, loadSavedTime, saveTime])

    // Логика таймера
    useEffect(() => {
        if (!initialized) return

        let timer: NodeJS.Timeout | null = null

        if (timerActive && timeRemaining > 0) {
            timer = setInterval(() => {
                setTimeRemaining(prev => {
                    const newTime = prev - 1
                    if (newTime <= 0) {
                        clearInterval(timer!)
                        setTimerActive(false)
                        localStorage.removeItem(`test_time_${attemptId}`)
                        onTimeExpired()
                        return 0
                    } else {
                        saveTime(newTime)
                        return newTime
                    }
                })
            }, 1000)
        }

        return () => {
            if (timer) clearInterval(timer)
        }
    }, [timerActive, timeRemaining, onTimeExpired, initialized, saveTime, attemptId])

    return (
        <div className={styles.timerContainer}>
            <div className={`${styles.timer} ${timeRemaining < 300 ? styles.timerWarning : ""}`}>
                {/* Оставшееся время:  */}
                {formatSeconds(timeRemaining)}
            </div>
        </div>
    )
}

export default TestTimer
