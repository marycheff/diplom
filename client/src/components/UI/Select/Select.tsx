import { SelectProps } from "@/components/ui/Select/Select.props"
import useOutsideClick from "@/hooks/useOutSideClick"
import { FC, useEffect, useRef, useState } from "react"
import styles from "./Select.module.scss"

const Select: FC<SelectProps> = ({
    name,
    options,
    register,
    value,
    error = false,
    label,
    required = false,
}: SelectProps) => {
    const [isOpen, setOpen] = useState(false)
    const [selected, setSelected] = useState(value || options[0]?.value || "") // Устанавливаем начальное значение
    const selectRef = useRef<HTMLDivElement>(null)

    useOutsideClick(selectRef, () => setOpen(false))

    useEffect(() => {
        const element = document.getElementById(name) as HTMLInputElement
        if (element) element.value = selected
    }, [selected, name])

    const containerClasses = [styles.container, isOpen ? styles.open : "", error ? styles.error : ""].join(" ")

    return (
        <div className={containerClasses}>
            {/* Лейбл для селекта */}
            {label && <label htmlFor={name}>{label}</label>}

            {/* Скрытый нативный селект для react-hook-form */}
            <select
                id={name}
                {...register(name, { required })}
                className={styles.htmlSelect}
                style={{ display: "none" }} // Скрываем нативный селект
            >
                {options.map(item => (
                    <option key={item.value} value={item.value}>
                        {item.label || item.value}
                    </option>
                ))}
            </select>

            {/* Кастомный селект */}
            <div ref={selectRef} onClick={() => setOpen(!isOpen)} className={styles.customSelectWrapper}>
                <div className={`${styles.customSelect} ${isOpen ? styles.open : ""}`}>
                    <div className={styles.customSelectTrigger}>
                        <span>
                            {options.find(item => item.value === selected)?.label ||
                                options.find(item => item.value === selected)?.value ||
                                "Выбрать"}
                        </span>
                        <div className={styles.arrow} />
                    </div>
                    <div className={styles.customOptions}>
                        {options.map(item => (
                            <div
                                key={item.value}
                                onClick={() => {
                                    setSelected(item.value) // Устанавливаем выбранное значение
                                    const element = document.getElementById(name) as HTMLInputElement
                                    if (element) {
                                        element.value = item.value // Обновляем значение скрытого селекта
                                        element.dispatchEvent(new Event("change", { bubbles: true })) // Триггерим событие change
                                    }
                                }}
                                className={styles.optionContainer}>
                                <span
                                    className={`${styles.customOption} ${
                                        selected === item.value ? styles.selected : ""
                                    }`}
                                    data-value={item.value}>
                                    {item.label || item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Select
