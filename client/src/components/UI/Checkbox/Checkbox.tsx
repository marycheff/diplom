import React from "react"
import styles from "./Checkbox.module.scss"

interface CheckboxProps {
    id: string
    label?: string
    checked: boolean
    disabled?: boolean
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox: React.FC<CheckboxProps> = ({ id, label, checked, disabled, onChange }) => {
    return (
        <div className={styles.checkboxWrapper}>
            <input
                id={id}
                type="checkbox"
                className={styles.promotedInputCheckbox}
                checked={checked}
                disabled={disabled}
                onChange={onChange}
            />
            <svg>
                <use xlinkHref="#checkmark-28" />
            </svg>
            <label htmlFor={id}>{label}</label>
            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                <symbol id="checkmark-28" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeMiterlimit="10" fill="none" d="M22.9 3.7l-15.2 16.6-6.6-7.1" />
                </symbol>
            </svg>
        </div>
    )
}

export default Checkbox
