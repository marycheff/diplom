import useOutsideClick from "@/shared/hooks/useOutSideClick"
import { FC, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { UseFormRegister, UseFormSetValue } from "react-hook-form"
import styles from "./Select.module.scss"

export interface SelectProps {
	name: string
	options: Option[]
	register: UseFormRegister<any>
	value?: string
	error?: boolean
	label?: string
	required?: boolean
	disabled?: boolean
	onChange?: (value: string) => void
	setValue: UseFormSetValue<any>
}

type Option = {
	value: string
	label?: string
}

const Select: FC<SelectProps> = ({
	name,
	options,
	register,
	value = "",
	error = false,
	label,
	required = false,
	disabled = false,
	setValue,
	onChange,
}: SelectProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const [selected, setSelected] = useState(value)
	const [position, setPosition] = useState<{ top: number; left: number; width: number } | null>(null)
	// Состояние для хранения максимальной ширины
	const [maxWidth, setMaxWidth] = useState<number | undefined>(undefined)

	const selectRef = useRef<HTMLDivElement>(null)
	const optionsRef = useRef<HTMLDivElement>(null)
	// Реф для измерения ширины элементов
	const ghostRef = useRef<HTMLDivElement>(null)

	// Синхронизация с внешним value
	useEffect(() => {
		setSelected(value)
	}, [value])

	// Расчет максимальной ширины
	useEffect(() => {
		if (!ghostRef.current) return

		const items = ghostRef.current.querySelectorAll("span")
		let max = 0
		items.forEach((el) => {
			const width = (el as HTMLElement).offsetWidth
			if (width > max) max = width
		})

		// Проверка на необходимость скролла
		const viewportHeight = window.innerHeight
		const dropdownHeight = options.length * 32
		const needsScroll = dropdownHeight > viewportHeight * 0.2

		// Установка ширины с учетом полосы прокрутки
		setMaxWidth(needsScroll ? max + 10 : max)
	}, [options, selected]) // Пересчет при изменении опций или выбранного значения

	// Закрытие при клике вне элемента
	useOutsideClick([selectRef, optionsRef], () => {
		setIsOpen(false)
	})

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

	// Обработчик открытия/закрытия
	const handleToggle = () => {
		if (disabled) return

		if (!isOpen) {
			setIsOpen(true)
			updatePosition()
		} else {
			setIsOpen(false)
		}
	}

	// Обработчик выбора опции
	const handleOptionSelect = (itemValue: string) => {
		setSelected(itemValue)
		setIsOpen(false)

		// Вызываем onChange немедленно
		if (onChange) {
			onChange(itemValue)
		}
		setValue(name, itemValue, { shouldDirty: true, shouldTouch: true, shouldValidate: true })
		// Обновляем скрытый input для react-hook-form
		const hiddenInput = document.getElementById(name) as HTMLInputElement
		if (hiddenInput) {
			hiddenInput.value = itemValue
			// Диспатчим событие для react-hook-form
			hiddenInput.dispatchEvent(new Event("change", { bubbles: true }))
		}
	}

	const selectedOption = options.find((option) => option.value === selected)
	const displayText =
		selectedOption?.label || selectedOption?.value || options[0]?.label || options[0]?.value || "Выбрать"

	const containerClasses = [
		styles.container,
		isOpen ? styles.open : "",
		error ? styles.error : "",
		disabled ? styles.disabled : "",
	].join(" ")

	return (
		<div className={containerClasses}>
			{label && <label htmlFor={name}>{label}</label>}

			{/* Скрытый input для react-hook-form */}
			<input
				id={name}
				{...register(name, { required })}
				type="hidden"
				value={selected}
			/>

			{/* Кастомный селект с рассчитанной шириной */}
			<div
				ref={selectRef}
				onClick={handleToggle}
				className={styles.customSelectWrapper}
				style={{ width: maxWidth ? `${maxWidth}px` : "auto" }} // Применяем рассчитанную ширину
			>
				<div className={`${styles.customSelect} ${isOpen ? styles.open : ""} ${error ? styles.error : ""}`}>
					<div className={styles.customSelectTrigger}>
						<span>{displayText}</span>
						<div className={styles.arrow} />
					</div>
				</div>
			</div>

			{/* Портал с выпадающим списком */}
			{isOpen &&
				position &&
				createPortal(
					<div
						ref={optionsRef}
						className={`${styles.customOptions} ${styles.open}`}
						style={{
							top: `${position.top}px`,
							left: `${position.left}px`,
							width: `${position.width}px`,
						}}
					>
						{options.map((option) => (
							<div
								key={option.value}
								onClick={() => handleOptionSelect(option.value)}
								className={`${styles.customOption} ${selected === option.value ? styles.selected : ""}`}
							>
								{option.label || option.value}
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
				{/* Измеряем текущее выбранное значение */}
				<span>{displayText}</span>
				{/* Измеряем все возможные опции */}
				{options.map((option) => (
					<span
						key={option.value}
						className={styles.ghostItem}
					>
						{option.label || option.value}
					</span>
				))}
			</div>
		</div>
	)
}

export default Select
