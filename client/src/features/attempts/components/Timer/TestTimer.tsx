import { useAttemptStore } from "@/features/attempts/store/useAttemptStore"
import { decryptData, encryptData } from "@/shared/utils/crypto"
import { formatSeconds } from "@/shared/utils/formatter"
import { useCallback, useEffect, useRef, useState } from "react"
import styles from "./TestTimer.module.scss"

const TIMER_SYNC_INTERVAL = 10000 // 10 секунд

interface TestTimerProps {
    attemptId: string
    defaultTime: number
    onTimeExpired: () => void
    isActive?: boolean
    timeSpent: number
}

const TestTimer = ({ attemptId, defaultTime, timeSpent, onTimeExpired, isActive = true }: TestTimerProps) => {
    const { updateTimeSpent } = useAttemptStore()
    const [timeRemaining, setTimeRemaining] = useState(defaultTime)
    const [timerActive, setTimerActive] = useState(isActive)
    const [initialized, setInitialized] = useState(false)
    const isSyncing = useRef(false)

    const timeRemainingRef = useRef(timeRemaining)

    // Обновляем ref при изменении timeRemaining
    useEffect(() => {
        timeRemainingRef.current = timeRemaining
    }, [timeRemaining])

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

    // Загрузка сохраненного времени из localStorage
    const loadSavedTime = useCallback(() => {
        try {
            const encryptedTime = localStorage.getItem(`test_time_${attemptId}`)
            if (encryptedTime) {
                const decryptedTime = decryptData(encryptedTime)
                if (decryptedTime) {
                    const parsedTime = parseInt(decryptedTime, 10)
                    if (!isNaN(parsedTime)) {
                        return parsedTime
                    }
                }
            }
            return null
        } catch (error) {
            console.error("Ошибка при загрузке сохраненного времени:", error)
            return null
        }
    }, [attemptId])

    // Синхронизация с сервером
    const syncWithServer = useCallback(async () => {
        if (isSyncing.current) return

        isSyncing.current = true
        try {
            const currentTimeSpent = defaultTime - timeRemainingRef.current
            await updateTimeSpent(attemptId, currentTimeSpent)
        } catch (error) {
            console.error("Sync failed:", error)
        } finally {
            isSyncing.current = false
        }
    }, [attemptId, defaultTime, updateTimeSpent])

    // Инициализация таймера при монтировании
    useEffect(() => {
        const savedTime = loadSavedTime()
        if (savedTime !== null) {
            setTimeRemaining(savedTime)
        } else if (timeSpent > 0) {
            // Вход с другого устройства: используем timeSpent
            const remaining = defaultTime - timeSpent
            setTimeRemaining(remaining > 0 ? remaining : 0)
            saveTime(remaining > 0 ? remaining : 0)
        } else {
            // Новая попытка: используем defaultTime
            setTimeRemaining(defaultTime)
            saveTime(defaultTime)
        }
        setInitialized(true)
    }, [defaultTime, timeSpent, loadSavedTime, saveTime])

    // Логика таймера и синхронизации
    useEffect(() => {
        if (!initialized || !timerActive || timeRemaining <= 0) return

        const uiTimer = window.setInterval(() => {
            setTimeRemaining(prev => {
                const newTime = prev - 1
                saveTime(newTime)
                return newTime
            })
        }, 1000)

        const syncTimer = window.setInterval(() => {
            syncWithServer()
        }, TIMER_SYNC_INTERVAL)

        syncWithServer()

        return () => {
            window.clearInterval(uiTimer)
            window.clearInterval(syncTimer)
        }
    }, [timerActive, initialized, syncWithServer, saveTime])

    // Обработка истечения времени
    useEffect(() => {
        if (timeRemaining <= 0 && timerActive) {
            setTimerActive(false)
            localStorage.removeItem(`test_time_${attemptId}`)
            syncWithServer().finally(onTimeExpired)
        }
    }, [timeRemaining, timerActive, attemptId, onTimeExpired, syncWithServer])

    // Синхронизация с серверным временем, если разница > 12 секунд
    useEffect(() => {
        if (initialized && timerActive && timeSpent > 0) {
            const savedTime = loadSavedTime()
            if (savedTime !== null) {
                const localTimeSpent = defaultTime - savedTime
                if (Math.abs(localTimeSpent - timeSpent) > 12) {
                    const remaining = defaultTime - timeSpent
                    setTimeRemaining(remaining > 0 ? remaining : 0)
                    saveTime(remaining > 0 ? remaining : 0)
                }
            }
        }
    }, [timeSpent, initialized, timerActive, defaultTime, loadSavedTime, saveTime])

    return (
        <div className={styles.timerContainer}>
            <div className={`${styles.timer} ${timeRemaining < 300 ? styles.timerWarning : ""}`}>
                {formatSeconds(timeRemaining)}
            </div>
        </div>
    )
}

export default TestTimer
