import React, { useState } from "react"

interface EditableFieldProps {
    label: string
    value: string
    onChange: (value: string) => void
    placeholder?: string
    onEditingChange?: (isEditing: boolean) => void // Новый пропс
}

const EditableField: React.FC<EditableFieldProps> = ({ label, value, onChange, placeholder, onEditingChange }) => {
    const [isEditing, setIsEditing] = useState(false)

    const handleEditClick = () => {
        setIsEditing(true)
        onEditingChange?.(true) // Сообщаем родителю, что поле редактируется
    }

    const handleSaveClick = () => {
        setIsEditing(false)
        onEditingChange?.(false) // Сообщаем родителю, что редактирование завершено
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

    return (
        <div>
            <label>{label}</label>
            <input
                type='text'
                value={value}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder={placeholder || "<Пусто>"}
            />
            {!isEditing ? <button onClick={handleEditClick}>✎</button> : <button onClick={handleSaveClick}>✔</button>}
        </div>
    )
}

export default EditableField
