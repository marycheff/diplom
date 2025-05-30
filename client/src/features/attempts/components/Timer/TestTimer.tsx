import { formatSeconds } from "@/shared/utils/formatter"
import React, { useEffect, useRef, useState } from "react"
import styles from "./TestTimer.module.scss"

interface TestTimerProps {
	attemptId: string
	timeLimit: number
	startedAt: Date
	onTimeExpired: () => void
	isActive?: boolean
}

const TestTimer = React.forwardRef<{ syncTime: () => Promise<void> }, TestTimerProps>(
	({ attemptId, timeLimit, startedAt, onTimeExpired, isActive = true }, ref) => {
		const [timeRemaining, setTimeRemaining] = useState<number>(timeLimit)
		const [timerActive, setTimerActive] = useState<boolean>(isActive)
		const hasExpiredRef = useRef<boolean>(false) // Флаг для предотвращения повторных вызовов
		const timerRef = useRef<NodeJS.Timeout | null>(null)

		// Функция для расчета оставшегося времени
		const calculateTimeRemaining = () => {
			const now = new Date()
			const startedAtDate = new Date(startedAt)
			const timeSpent = Math.floor((now.getTime() - startedAtDate.getTime()) / 1000) // Время в секундах
			const remaining = timeLimit - timeSpent
			return remaining > 0 ? remaining : 0
		}

		// Инициализация и обновление таймера
		useEffect(() => {
			if (hasExpiredRef.current || !timerActive) return

			// Пересчитываем оставшееся время
			const initialRemaining = calculateTimeRemaining()
			setTimeRemaining(initialRemaining)

			if (initialRemaining <= 0) {
				setTimerActive(false)
				hasExpiredRef.current = true // Помечаем, что время истекло
				onTimeExpired()
				return
			}

			// Запускаем таймер
			timerRef.current = setInterval(() => {
				const remaining = calculateTimeRemaining()
				setTimeRemaining(remaining)
				if (remaining <= 0) {
					setTimerActive(false)
					hasExpiredRef.current = true // Помечаем, что время истекло
					if (timerRef.current) clearInterval(timerRef.current)
					onTimeExpired()
				}
			}, 1000)

			return () => {
				if (timerRef.current) clearInterval(timerRef.current)
			}
		}, [timeLimit, startedAt, timerActive, onTimeExpired])

		return (
			<div className={styles.timerContainer}>
				<div className={`${styles.timer} ${timeRemaining < 300 ? styles.timerWarning : ""}`}>
					{formatSeconds(timeRemaining)}
				</div>
			</div>
		)
	}
)

export default TestTimer
