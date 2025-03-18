import { FC } from "react"

import BaseInput, { BaseInputProps } from "@/components/ui/Input/BaseInput/BaseInput"
import styles from "./ClearableInput.module.css"

export interface ClearableInputProps extends BaseInputProps {
    onClear: () => void
}

const ClearableInput: FC<ClearableInputProps> = ({ onClear, value, disabled, ...rest }) => {
    return (
        <div className={styles.clearableContainer}>
            <BaseInput {...rest} value={value} disabled={disabled} />
            {!disabled && value && (
                <button type="button" onClick={onClear} className={styles.clearButton}>
                    ×
                </button>
            )}
        </div>
    )
}

export default ClearableInput
