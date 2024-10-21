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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

    return (
        <div style={{ marginBottom: "1rem" }}>
            <label>{label}</label>
            <input
                type='text'
                value={value}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder={placeholder || "<Пусто>"} 
                style={{ marginLeft: "1rem", padding: "0.5rem" }}
            />
            <button onClick={handleEditClick} style={{ marginLeft: "1rem", padding: "0.5rem" }}>
                Редактировать
            </button>
        </div>
    )
}

export default EditableField
