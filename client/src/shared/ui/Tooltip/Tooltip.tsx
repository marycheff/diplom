import { FC, RefObject, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import styles from "./Tooltip.module.scss"

interface TooltipProps {
	content: string
	position?: "top" | "bottom" | "right" | "auto"
	targetRef: RefObject<HTMLElement | null>
	delay?: number
}

const Tooltip: FC<TooltipProps> = ({ content, position = "top", targetRef, delay = 300 }) => {
	const [visible, setVisible] = useState(false)
	const tooltipRef = useRef<HTMLDivElement>(null)
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)

	// Управление событиями мыши и задержкой
	useEffect(() => {
		const isMobile = window.innerWidth <= 1024
		const target = targetRef.current

		const handleMouseEnter = () => {
			if (isMobile) return
			if (timeoutRef.current) clearTimeout(timeoutRef.current)
			timeoutRef.current = setTimeout(() => setVisible(true), delay)
		}

		const handleMouseLeave = () => {
			if (isMobile) return
			if (timeoutRef.current) clearTimeout(timeoutRef.current)
			setVisible(false)
		}

		const handleTouchStart = () => {
			if (!isMobile) return
			setVisible(true)
		}

		const handleTouchEnd = () => {
			if (!isMobile) return
			setTimeout(() => setVisible(false), 300)
		}

		if (target) {
			target.addEventListener("mouseenter", handleMouseEnter)
			target.addEventListener("mouseleave", handleMouseLeave)
			target.addEventListener("touchstart", handleTouchStart)
			target.addEventListener("touchend", handleTouchEnd)
		}

		return () => {
			if (target) {
				target.removeEventListener("mouseenter", handleMouseEnter)
				target.removeEventListener("mouseleave", handleMouseLeave)
				target.removeEventListener("touchstart", handleTouchStart)
				target.removeEventListener("touchend", handleTouchEnd)
			}
			if (timeoutRef.current) clearTimeout(timeoutRef.current)
		}
	}, [targetRef, delay])
	useEffect(() => {
		const handleScroll = () => setVisible(false)
		const handleClickOutside = (e: MouseEvent) => {
			if (!tooltipRef.current?.contains(e.target as Node)) {
				setVisible(false)
			}
		}

		if (visible) {
			window.addEventListener("scroll", handleScroll)
			document.addEventListener("click", handleClickOutside)
		}

		return () => {
			window.removeEventListener("scroll", handleScroll)
			document.removeEventListener("click", handleClickOutside)
		}
	}, [visible])



	// Позиционирование тултипа с автоматическим определением позиции
	useEffect(() => {
		if (visible && !targetRef.current) {
			setVisible(false)
		} else if (tooltipRef.current && targetRef.current) {
			const targetRect = targetRef.current.getBoundingClientRect()
			const tooltipRect = tooltipRef.current.getBoundingClientRect()
			const viewportHeight = window.innerHeight
			const viewportWidth = window.innerWidth

			// Определение позиции
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

			// Добавление класса с позицией для стилизации
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
