import React, { useState } from "react"

interface EditableFieldProps {
    label: string
    value: string
    onChange: (newValue: string) => void
    placeholder?: string // Опциональный пропс для placeholder
}

const EditableField: React.FC<EditableFieldProps> = ({ label, value, onChange, placeholder }) => {
    const [isEditing, setIsEditing] = useState(false)

    const handleEditClick = () => {
        setIsEditing(true)
    }

    const handleSaveClick = () => {
        setIsEditing(false) // Делаем поле disabled после сохранения
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
