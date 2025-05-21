import { Button } from "@/shared/ui/Button"
import Input from "@/shared/ui/Input/Base/Input"
import { EditableInputProps } from "@/shared/ui/Input/Editable/EditableInput.props"
import { ChangeEvent, JSX, useState } from "react"
import { FaCheck } from "react-icons/fa6"
import { MdEdit } from "react-icons/md"
import styles from "./EditableInput.module.scss"
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
                    floatingLabel={false}
                />
                {!isEditing ? (
                    <Button onClick={handleEditClick}>
                        <MdEdit />
                    </Button>
                ) : (
                    <Button onClick={handleSaveClick}>
                        <FaCheck />
                    </Button>
                )}
            </div>
        </div>
    )
}

export default EditableInput
