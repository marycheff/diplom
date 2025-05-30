import { FC, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import styles from "./Tooltip.module.scss"

interface TooltipProps {
	content: string
	position?: "top" | "bottom" | "right" | "auto"
	targetRef: React.RefObject<HTMLElement | null>
	delay?: number
}

const Tooltip: FC<TooltipProps> = ({ content, position = "top", targetRef, delay = 300 }) => {
	const [visible, setVisible] = useState(false)
	const tooltipRef = useRef<HTMLDivElement>(null)
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)

	// Управление событиями мыши и задержкой
	useEffect(() => {
		const handleMouseEnter = () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
			timeoutRef.current = setTimeout(() => {
				setVisible(true)
			}, delay)
		}

		const handleMouseLeave = () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
				timeoutRef.current = null
			}
			setVisible(false)
		}

		const target = targetRef.current
		if (target) {
			target.addEventListener("mouseenter", handleMouseEnter)
			target.addEventListener("mouseleave", handleMouseLeave)
		}

		return () => {
			if (target) {
				target.removeEventListener("mouseenter", handleMouseEnter)
				target.removeEventListener("mouseleave", handleMouseLeave)
			}
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
				timeoutRef.current = null
			}
		}
	}, [targetRef, delay])

	// Позиционирование тултипа с автоматическим определением позиции
	useEffect(() => {
		if (visible && !targetRef.current) {
			setVisible(false)
		} else if (tooltipRef.current && targetRef.current) {
			const targetRect = targetRef.current.getBoundingClientRect()
			const tooltipRect = tooltipRef.current.getBoundingClientRect()
			const viewportHeight = window.innerHeight
			const viewportWidth = window.innerWidth

			// Определяем позицию
			let actualPosition = position

			if (position === "auto") {
				const spaceAbove = targetRect.top // Место сверху от элемента
				const spaceBelow = viewportHeight - targetRect.bottom // Место снизу
				const spaceRight = viewportWidth - targetRect.right // Место справа

				// Приоритет: справа, сверху, снизу
				if (spaceRight >= tooltipRect.width + 8) {
					actualPosition = "right"
				} else if (spaceAbove >= tooltipRect.height + 8) {
					actualPosition = "top"
				} else if (spaceBelow >= tooltipRect.height + 8) {
					actualPosition = "bottom"
				} else {
					// Если нигде не хватает места, выбираем справа
					actualPosition = "right"
				}
			}

			let top: number
			let left: number

			if (actualPosition === "top") {
				top = targetRect.top - tooltipRect.height - 8
				left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2
			} else if (actualPosition === "bottom") {
				top = targetRect.bottom + 8
				left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2
			} else if (actualPosition === "right") {
				top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2
				left = targetRect.right + 8
			} else {
				// Если позиция не определена, используем top
				top = targetRect.top - tooltipRect.height - 8
				left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2
			}

			// Проверка на выход за границы экрана
			if (left < 0) left = 8
			if (left + tooltipRect.width > viewportWidth) left = viewportWidth - tooltipRect.width - 8
			if (top < 0) top = 8
			if (top + tooltipRect.height > viewportHeight) top = viewportHeight - tooltipRect.height - 8

			tooltipRef.current.style.top = `${top}px`
			tooltipRef.current.style.left = `${left}px`

			// Добавляем класс с позицией для стилизации
			tooltipRef.current.dataset.position = actualPosition
		}
	}, [visible, position, targetRef])

	return createPortal(
		<div
			ref={tooltipRef}
			className={`${styles.tooltip} ${visible ? styles.visible : ""}`}
		>
			{content}
		</div>,
		document.getElementById("portal-root")!
	)
}

export default Tooltip
