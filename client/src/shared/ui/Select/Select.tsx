import useOutsideClick from "@/shared/hooks/useOutSideClick"
import { SelectProps } from "@/shared/ui/Select/Select.props"
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
    disabled = false,
    onChange,
}: SelectProps) => {
    const [isOpen, setOpen] = useState(false)
    const [selected, setSelected] = useState(value || options[0]?.value || "")
    const [maxWidth, setMaxWidth] = useState<number | undefined>(undefined)

    const selectRef = useRef<HTMLDivElement>(null)
    const ghostRef = useRef<HTMLDivElement>(null)

    useOutsideClick(selectRef, () => setOpen(false))

    useEffect(() => {
        const element = document.getElementById(name) as HTMLInputElement
        if (element) element.value = selected
    }, [selected, name])

    useEffect(() => {
        if (onChange) {
            onChange(selected)
        }
    }, [selected, onChange])

    useEffect(() => {
        if (!ghostRef.current) return

        const items = ghostRef.current.querySelectorAll("span")
        let max = 0
        items.forEach(el => {
            const width = (el as HTMLElement).offsetWidth
            if (width > max) max = width
        })

        setMaxWidth(max)
    }, [options])

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
                style={{ display: "none" }}>
                {options.map(item => (
                    <option key={item.value} value={item.value}>
                        {item.label || item.value}
                    </option>
                ))}
            </select>

            {/* 👇 Применяем вычисленную ширину */}
            <div
                ref={selectRef}
                onClick={() => !disabled && setOpen(!isOpen)}
                className={styles.customSelectWrapper}
                style={{ width: maxWidth ? `${maxWidth}px` : "auto" }}>
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
                                    setSelected(item.value)
                                    const element = document.getElementById(name) as HTMLInputElement
                                    if (element) {
                                        element.value = item.value
                                        element.dispatchEvent(new Event("change", { bubbles: true }))
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

            {/* 👇 Скрытый элемент для измерения ширины */}
            <div ref={ghostRef} className={styles.ghostMeasure}>
                {options.map(item => (
                    <span key={item.value} className={styles.ghostItem}>
                        {item.label || item.value}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default Select
