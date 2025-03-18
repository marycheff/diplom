import { Button } from "@/components/ui/Button/Button"
import Input from "@/components/ui/Input/Input"
import { ChangeEvent, JSX, useState } from "react"
import { Path } from "react-hook-form"
import styles from "./EditableInput.module.css"


interface EditableInputProps<T extends Record<string, any>> {
    name: Path<T> 
    label: string
    value: string | null
    onChange: (value: string) => void
    placeholder?: string
    onEditingChange?: (isEditing: boolean) => void
}

const EditableInput = <T extends Record<string, any>>({
    name,
    label,
    value,
    onChange,
    placeholder,
    onEditingChange,
}: EditableInputProps<T>): JSX.Element => {
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
                <Input
                    name={name} 
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
