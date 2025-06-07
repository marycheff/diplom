import Button from "@/shared/ui/Button/Base/Button"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { FaCheck } from "react-icons/fa6"
import { MdContentCopy } from "react-icons/md"
import styles from "./CopyButton.module.scss"

interface CopyButtonProps {
	textToCopy: string
	className?: string
	showOnHover?: boolean
	variant?: "icon" | "text"
}

const CopyButton = ({ textToCopy, className = "", showOnHover = false, variant = "icon" }: CopyButtonProps) => {
	const [isCopied, setIsCopied] = useState(false)
	const [isParentHovered, setIsParentHovered] = useState(false)
	const [isTimeout, setIsTimeout] = useState(false)
	const buttonRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		const parent = buttonRef.current?.parentElement
		if (!parent || !showOnHover) return

		const handleMouseEnter = () => setIsParentHovered(true)
		const handleMouseLeave = () => setIsParentHovered(false)

		parent.addEventListener("mouseenter", handleMouseEnter)
		parent.addEventListener("mouseleave", handleMouseLeave)

		return () => {
			parent.removeEventListener("mouseenter", handleMouseEnter)
			parent.removeEventListener("mouseleave", handleMouseLeave)
		}
	}, [showOnHover])

	const handleCopy = async () => {
		if (isTimeout) return

		try {
			setIsTimeout(true)

			if (navigator.clipboard && window.isSecureContext) {
				await navigator.clipboard.writeText(textToCopy)
			} else {
				// Fallback для HTTP
				const textArea = document.createElement("textarea")
				textArea.value = textToCopy
				textArea.style.position = "fixed"
				textArea.style.left = "-999999px"
				textArea.style.top = "-999999px"
				document.body.appendChild(textArea)
				textArea.focus()
				textArea.select()

				const successful = document.execCommand("copy")
				document.body.removeChild(textArea)

				if (!successful) {
					toast.error("Копирование не удалось")
				}
			}

			setIsCopied(true)
			toast.success("Скопировано!")
			setTimeout(() => {
				setIsCopied(false)
				setIsTimeout(false)
			}, 1500)
		} catch (err) {
			setIsTimeout(false)
			toast.error("Ошибка копирования")
		}
	}

	const getIcon = () => {
		return isCopied ? <FaCheck /> : <MdContentCopy />
	}

	if (variant === "text") {
		return (
			<Button
				onClick={handleCopy}
				className={`${styles.textButton} ${className}`}
			>
				<span className={styles.content}>
					{isCopied ? "Скопировано" : "Копировать"}
					{getIcon()}
				</span>
			</Button>
		)
	}

	return (
		<button
			ref={buttonRef}
			className={`${styles.iconButton} ${className}`}
			onClick={handleCopy}
			title={isTimeout ? "Подождите..." : "Скопировать"}
			aria-label={isTimeout ? "Подождите..." : "Копировать в буфер обмена"}
			type="button"
			disabled={isTimeout}
			data-visible={showOnHover ? isParentHovered : true}
		>
			{getIcon()}
		</button>
	)
}

export default CopyButton
