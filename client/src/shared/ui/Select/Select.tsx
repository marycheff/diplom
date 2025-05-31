import useOutsideClick from "@/shared/hooks/useOutSideClick"
import { SelectProps } from "@/shared/ui/Select/Select.props"
import { FC, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import styles from "./Select.module.scss"

const Select: FC<SelectProps> = ({
	name,
	options,
	register,
	value,
	error = false,
	label,
	required = false,
	disabled = false,
	onChange,
}: SelectProps) => {
	const [isOpen, setOpen] = useState(false)
	const [selected, setSelected] = useState(value || options[0]?.value || "")
	const [maxWidth, setMaxWidth] = useState<number | undefined>(undefined)
	const [position, setPosition] = useState<{ top: number; left: number; width: number } | null>(null)
	const [isVisible, setIsVisible] = useState(false)

	const selectRef = useRef<HTMLDivElement>(null)
	const ghostRef = useRef<HTMLDivElement>(null)
	const optionsRef = useRef<HTMLDivElement>(null)

	// Закрытие при клике вне элемента
	useOutsideClick([selectRef, optionsRef], () => {
		if (isOpen) {
			closeSelect()
		}
	})

	// Обновление значения в скрытом select
	useEffect(() => {
		const element = document.getElementById(name) as HTMLInputElement
		if (element) element.value = String(selected)
	}, [selected, name])

	// Вызов callback при изменении значения
	useEffect(() => {
		if (onChange) {
			onChange(selected)
		}
	}, [selected, onChange])

	// Вычисление максимальной ширины на основе содержимого
	useEffect(() => {
		if (!ghostRef.current) return

		const items = ghostRef.current.querySelectorAll("span")
		let max = 0
		items.forEach((el) => {
			const width = (el as HTMLElement).offsetWidth
			if (width > max) max = width
		})

		//  Проверка на необходимость скролла
		const viewportHeight = window.innerHeight
		const dropdownHeight = options.length * 32 // Примерная высота элемента
		const needsScroll = dropdownHeight > viewportHeight * 0.2

		setMaxWidth(needsScroll ? max + 10 : max)
	}, [options])

	// Обновление позиции выпадающего списка
	const updatePosition = () => {
		if (selectRef.current) {
			const rect = selectRef.current.getBoundingClientRect()
			setPosition({
				top: rect.bottom + window.scrollY,
				left: rect.left + window.scrollX,
				width: rect.width,
			})
		}
	}

	// Открытие селекта с анимацией
	const openSelect = () => {
		if (disabled) return

		setOpen(true)
		setIsVisible(true)
		updatePosition()

		window.addEventListener("scroll", updatePosition, true)
		window.addEventListener("resize", updatePosition)
	}

	// Закрытие селекта с анимацией
	const closeSelect = () => {
		setOpen(false)

		window.removeEventListener("scroll", updatePosition, true)
		window.removeEventListener("resize", updatePosition)

		// Задержка для завершения анимации перед скрытием
		setTimeout(() => {
			setPosition(null)
			setIsVisible(false)
		}, 300)
	}

	// Обработчик клика по триггеру
	const handleToggle = () => {
		if (isOpen) {
			closeSelect()
		} else {
			openSelect()
		}
	}

	// Обработчик выбора опции
	const handleOptionSelect = (itemValue: string) => {
		setSelected(itemValue)
		const element = document.getElementById(name) as HTMLInputElement
		if (element) {
			element.value = itemValue
			element.dispatchEvent(new Event("change", { bubbles: true }))
		}
		closeSelect()
	}

	const containerClasses = [
		styles.container,
		isOpen ? styles.open : "",
		error ? styles.error : "",
		disabled ? styles.disabled : "",
	].join(" ")

	return (
		<div className={containerClasses}>
			{label && <label htmlFor={name}>{label}</label>}

			<select
				id={name}
				{...register(name, { required })}
				className={styles.htmlSelect}
				style={{ display: "none" }}
			>
				{options.map((item) => (
					<option
						key={item.value}
						value={item.value}
					>
						{item.label || item.value}
					</option>
				))}
			</select>

			<div
				ref={selectRef}
				onClick={handleToggle}
				className={styles.customSelectWrapper}
				style={{ width: maxWidth ? `${maxWidth}px` : "auto" }}
			>
				<div className={`${styles.customSelect} ${isOpen ? styles.open : ""} ${error ? styles.error : ""}`}>
					<div className={styles.customSelectTrigger}>
						<span>
							{options.find((item) => item.value === selected)?.label ||
								options.find((item) => item.value === selected)?.value ||
								"Выбрать"}
						</span>
						<div className={styles.arrow} />
					</div>
				</div>
			</div>

			{/* Рендерим выпадающий список через портал */}
			{(isOpen || isVisible) &&
				position &&
				createPortal(
					<div
						ref={optionsRef}
						className={`${styles.customOptions} ${isOpen ? styles.open : ""}`}
						style={{
							top: `${position.top}px`,
							left: `${position.left}px`,
							width: `${position.width}px`,
						}}
					>
						{options.map((item) => (
							<div
								key={item.value}
								onClick={() => handleOptionSelect(item.value)}
								className={styles.optionContainer}
							>
								<span
									className={`${styles.customOption} ${selected === item.value ? styles.selected : ""}`}
									data-value={item.value}
								>
									{item.label || item.value}
								</span>
							</div>
						))}
					</div>,
					document.body
				)}

			{/* Скрытый элемент для измерения ширины */}
			<div
				ref={ghostRef}
				className={styles.ghostMeasure}
			>
				{options.map((item) => (
					<span
						key={item.value}
						className={styles.ghostItem}
					>
						{item.label || item.value}
					</span>
				))}
			</div>
		</div>
	)
}

export default Select
