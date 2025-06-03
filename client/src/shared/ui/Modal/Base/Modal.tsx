import { FC, MouseEvent, ReactNode, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { RxCross2 } from "react-icons/rx"
import styles from "./Modal.module.scss"

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	children: ReactNode
	title?: string
	fullScreen?: boolean
	isConfirmation?: boolean
}

// Вычисление ширины скроллбара
const getScrollbarWidth = () => {
	const outer = document.createElement("div")
	outer.style.visibility = "hidden"
	outer.style.overflow = "scroll"
	document.body.appendChild(outer)
	const inner = document.createElement("div")
	outer.appendChild(inner)
	const width = outer.offsetWidth - inner.offsetWidth
	outer.remove()
	return width
}

// Счётчик открытых модальных окон
let openModalsCount = 0

const Modal: FC<ModalProps> = ({ isOpen, onClose, children, title, fullScreen, isConfirmation = false }) => {
	// Флаг рендера для анимации появления
	const [isMounted, setIsMounted] = useState(false)

	// Флаг начала нажатия вне окна
	const [mouseDownStartedOutside, setMouseDownStartedOutside] = useState(false)

	// Управление монтированием компонента для плавной анимации закрытия
	useEffect(() => {
		if (isOpen) {
			setIsMounted(true)
		} else {
			const timer = setTimeout(() => setIsMounted(false), 200)
			return () => clearTimeout(timer)
		}
	}, [isOpen])

	// Управление блокировкой прокрутки при открытии модального окна
	useEffect(() => {
		if (!isOpen) return

		// Инициализация блокировки скролла при первом окне
		if (openModalsCount === 0) {
			const hasVerticalScrollbar = document.documentElement.scrollHeight > document.documentElement.clientHeight

			if (hasVerticalScrollbar) {
				const scrollbarWidth = getScrollbarWidth()
				const currentPadding = parseInt(getComputedStyle(document.body).paddingRight || "0", 10)
				document.body.style.paddingRight = `${currentPadding + scrollbarWidth}px`
			}

			document.body.style.overflow = "hidden"
		}

		// Увеличение счётчика открытых окон
		openModalsCount++

		// Очистка и восстановление скролла при закрытии последнего окна
		return () => {
			openModalsCount--
			if (openModalsCount === 0) {
				document.body.style.overflow = ""
				document.body.style.paddingRight = ""
			}
		}
	}, [isOpen])

	// Закрытие модального окна
	const handleClose = () => onClose()

	// Обработка нажатия мыши по оверлею (инициализация закрытия)
	const onOverlayMouseDown = (e: MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			setMouseDownStartedOutside(true)
		}
	}

	// Обработка отпускания мыши по оверлею (подтверждение закрытия)
	const onOverlayMouseUp = (e: MouseEvent<HTMLDivElement>) => {
		if (mouseDownStartedOutside && e.target === e.currentTarget) {
			handleClose()
		}
		setMouseDownStartedOutside(false)
	}

	// Прерывание рендера до завершения анимации открытия
	if (!isMounted) return null

	// Использование портала для рендеринга модального окна в конце body
	return createPortal(
		<div
			className={`${styles.modalOverlay} ${!isOpen ? styles.closing : ""}`}
			onMouseDown={onOverlayMouseDown}
			onMouseUp={onOverlayMouseUp}
		>
			<div
				className={`
                    ${styles.modalContent}
                    ${!isOpen ? styles.closing : ""}
                    ${fullScreen ? styles.fullScreen : ""}
                    ${isConfirmation ? styles.confirmation : ""}
                `}
				onMouseDown={(e) => e.stopPropagation()}
			>
				<button
					className={styles.closeButton}
					onClick={handleClose}
				>
					<RxCross2 />
				</button>
				{title && <h2 className={styles.modalTitle}>{title}</h2>}
				<div className={styles.modalBody}>{children}</div>
			</div>
		</div>,
		document.body
	)
}

export default Modal
