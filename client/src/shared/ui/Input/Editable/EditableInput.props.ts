import { Path } from "react-hook-form"
export interface EditableInputProps<T extends Record<string, any>> {
	name: Path<T>
	label: string
	value: string | null
	onChange: (value: string) => void
	placeholder?: string
	onEditingChange?: (isEditing: boolean) => void
}
