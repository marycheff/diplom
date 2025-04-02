import { InputProps } from "@/shared/ui/Input"
import { FC, KeyboardEvent } from "react"
import styles from "./SearchBar.module.scss" // Импортируем стили

export interface SearchBarProps extends InputProps {
    handleSearch: () => void // Функция для выполнения поиска
    onClearSearch: () => void // Функция для очистки поиска
}

const SearchBar: FC<SearchBarProps> = ({
    value,
    onChange,
    handleSearch,
    onClearSearch,
    placeholder = "Поиск",
    ...rest
}) => {
    // Обработка нажатия клавиши Enter
    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch()
            ;(event.target as HTMLInputElement).blur() // Убрать фокус со строки поиска
        }
    }

    return (
        <div className={styles.searchBar}>
            {/* Используем ваш компонент Input */}
            <input
                type="text"
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                className={styles.input}
                {...rest}
            />

            {/* Кнопка очистки */}
            {value && (
                <button type="button" onClick={onClearSearch} className={styles.clearButton}>
                    &times;
                </button>
            )}

            {/* Кнопка поиска */}
            <button type="button" onClick={handleSearch} className={styles.searchButton}>
                Найти
            </button>
        </div>
    )
}

export default SearchBar
