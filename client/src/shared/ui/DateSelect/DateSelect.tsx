import { FC, useEffect, useState } from "react"
import { UseFormRegister, UseFormSetValue, UseFormTrigger } from "react-hook-form"
import Select from "../Select/Select"
import styles from "./DateSelect.module.scss"

interface DateSelectProps {
	name: string
	register: UseFormRegister<any>
	setValue: UseFormSetValue<any>
	trigger: UseFormTrigger<any>
	value?: string
	error?: boolean
	required?: boolean
	label?: string
}

const DateSelect: FC<DateSelectProps> = ({
	name,
	register,
	setValue,
	trigger,
	value,
	error = false,
	required = false,
	label,
}) => {
	// Получение текущего года и вычисление диапазона годов
	const currentYear = new Date().getFullYear()
	const startYear = currentYear - 100
	const endYear = currentYear

	// Парсинг начального значения, если оно есть (формат дд.мм.гггг)
	const [initialDay, initialMonth, initialYear] = value ? value.split(".") : ["", "", ""]

	// Состояния для выбранных значений
	const [selectedDay, setSelectedDay] = useState(initialDay || "")
	const [selectedMonth, setSelectedMonth] = useState(initialMonth || "")
	const [selectedYear, setSelectedYear] = useState(initialYear || "")

	// Генерация массивов опций для селектов
	const generateDays = () => {
		const days = []
		for (let i = 1; i <= 31; i++) {
			const day = i < 10 ? `0${i}` : `${i}`
			days.push({ value: day, label: day })
		}
		return days
	}

	const generateMonths = () => {
		const months = []
		for (let i = 1; i <= 12; i++) {
			const month = i < 10 ? `0${i}` : `${i}`
			months.push({ value: month, label: month })
		}
		return months
	}

	const generateYears = () => {
		const years = []
		for (let i = endYear; i >= startYear; i--) {
			const year = `${i}`
			years.push({ value: year, label: year })
		}
		return years
	}

	// Обработчики изменения селектов
	const handleDayChange = (value: string) => {
		setSelectedDay(value)
	}

	const handleMonthChange = (value: string) => {
		setSelectedMonth(value)
	}

	const handleYearChange = (value: string) => {
		setSelectedYear(value)
	}

	// Обновление значения поля при изменении любого из селектов
	useEffect(() => {
		if (selectedDay && selectedMonth && selectedYear) {
			// Преобразование в ISO формат для внутреннего использования
			const isoDate = `${selectedYear}-${selectedMonth}-${selectedDay}`

			// Сохранение ISO формата в скрытом поле
			// setValue(`${name}_iso`, isoDate)
			setValue(name, isoDate)

			// Запуск валидации
			trigger(name)
		} else if (required) {
			// Если поле обязательное, но не все части даты выбраны, установка пустого значения
			setValue(name, "")
			trigger(name)
		}
	}, [selectedDay, selectedMonth, selectedYear, setValue, name, trigger, required])

	return (
		<div className={styles.dateSelectContainer}>
			{label && <label className={styles.label}>{label}</label>}
			<div className={styles.selectsContainer}>
				<div className={styles.selectWrapper}>
					<Select
						name={`${name}_day`}
						options={generateDays()}
						register={register}
						setValue={setValue}
						value={selectedDay}
						error={error}
						required={required}
						label="День"
						onChange={handleDayChange}
					/>
				</div>
				<div className={styles.selectWrapper}>
					<Select
						name={`${name}_month`}
						options={generateMonths()}
						register={register}
						setValue={setValue}
						value={selectedMonth}
						error={error}
						required={required}
						label="Месяц"
						onChange={handleMonthChange}
					/>
				</div>
				<div className={styles.selectWrapper}>
					<Select
						name={`${name}_year`}
						options={generateYears()}
						register={register}
						setValue={setValue}
						value={selectedYear}
						error={error}
						required={required}
						label="Год"
						onChange={handleYearChange}
					/>
				</div>
			</div>

			{/* Скрытое поле для хранения форматированной даты */}
			<input
				type="hidden"
				id={name}
				{...register(name, { required })}
			/>

			{/* Скрытое поле для хранения даты в ISO формате */}
			<input
				type="hidden"
				id={`${name}_iso`}
				{...register(`${name}_iso`)}
			/>

			{/* Отображение ошибки */}
			{error && required && <div className={styles.error}>Поле обязательно для заполнения</div>}
		</div>
	)
}

export default DateSelect
