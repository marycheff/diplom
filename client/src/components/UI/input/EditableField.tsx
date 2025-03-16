import { ChangeEvent, FC, useState } from "react"

interface EditableFieldProps {
    label: string
    value: string | null
    onChange: (value: string) => void
    placeholder?: string
    onEditingChange?: (isEditing: boolean) => void // Новый пропс
}

const EditableField: FC<EditableFieldProps> = ({ label, value, onChange, placeholder, onEditingChange }) => {
    const [isEditing, setIsEditing] = useState(false)
    const safeValue = value === null ? "" : value
    const handleEditClick = () => {
        setIsEditing(true)
        onEditingChange?.(true) // Сообщаем родителю, что поле редактируется
    }

    const handleSaveClick = () => {
        setIsEditing(false)
        onEditingChange?.(false) // Сообщаем родителю, что редактирование завершено
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

    return (
        <div>
            <label>{label}</label>
            <input
                type="text"
                value={safeValue}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder={placeholder || "<Пусто>"}
            />
            {!isEditing ? <button onClick={handleEditClick}>✎</button> : <button onClick={handleSaveClick}>✔</button>}
        </div>
    )
}

export default EditableField
