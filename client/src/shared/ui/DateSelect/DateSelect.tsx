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
    // Получаем текущий год и вычисляем диапазон годов (от текущего года - 100 до текущего года)
    const currentYear = new Date().getFullYear()
    const startYear = currentYear - 100
    const endYear = currentYear

    // Парсим начальное значение, если оно есть (формат дд.мм.гггг)
    const [initialDay, initialMonth, initialYear] = value ? value.split(".") : ["", "", ""]

    // Состояния для выбранных значений
    const [selectedDay, setSelectedDay] = useState(initialDay || "")
    const [selectedMonth, setSelectedMonth] = useState(initialMonth || "")
    const [selectedYear, setSelectedYear] = useState(initialYear || "")

    // Генерируем массивы опций для селектов
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

    // Обновляем значение поля при изменении любого из селектов
    useEffect(() => {
        if (selectedDay && selectedMonth && selectedYear) {
            // Преобразуем в ISO формат для внутреннего использования
            const isoDate = `${selectedYear}-${selectedMonth}-${selectedDay}`

            // Сохраняем ISO формат в скрытом поле
            // setValue(`${name}_iso`, isoDate)
            setValue(name, isoDate)

            // Запускаем валидацию
            trigger(name)
        } else if (required) {
            // Если поле обязательное, но не все части даты выбраны, устанавливаем пустое значение
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
                        value={selectedYear}
                        error={error}
                        required={required}
                        label="Год"
                        onChange={handleYearChange}
                    />
                </div>
            </div>

            {/* Скрытое поле для хранения форматированной даты */}
            <input type="hidden" id={name} {...register(name, { required })} />

            {/* Скрытое поле для хранения даты в ISO формате */}
            <input type="hidden" id={`${name}_iso`} {...register(`${name}_iso`)} />

            {/* Отображение ошибки */}
            {error && required && <div className={styles.error}>Поле обязательно для заполнения</div>}
        </div>
    )
}

export default DateSelect
