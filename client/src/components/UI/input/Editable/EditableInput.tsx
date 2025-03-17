import { Button } from "@/components/ui/Button/Button"
import Input from "@/components/ui/Input/Input"
import { ChangeEvent, FC, useState } from "react"
import styles from "./EditableInput.module.css"

interface EditableInputProps {
    label: string
    value: string | null
    onChange: (value: string) => void
    placeholder?: string
    onEditingChange?: (isEditing: boolean) => void
}

// Define a type for the form fields
type EditableFieldType = {
    editableField: string
}

const EditableInput: FC<EditableInputProps> = ({ label, value, onChange, placeholder, onEditingChange }) => {
    const [isEditing, setIsEditing] = useState(false)
    const safeValue = value === null ? "" : value

    const handleEditClick = () => {
        setIsEditing(true)
        onEditingChange?.(true)
    }

    const handleSaveClick = () => {
        setIsEditing(false)
        onEditingChange?.(false)
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

    return (
        <div className={styles.editableField}>
            <label className={styles.label}>{label}</label>
            <div className={styles.rowContainer}>
                <Input<EditableFieldType>
                    placeholder={placeholder || "<Пусто>"}
                    disabled={!isEditing}
                    clearable={isEditing}
                    value={safeValue}
                    onChange={handleInputChange}
                />
                {!isEditing ? (
                    <Button onClick={handleEditClick}>✎</Button>
                ) : (
                    <Button onClick={handleSaveClick}>✔</Button>
                )}
            </div>
        </div>
    )
}

export default EditableInput
