import { FC } from "react"
import { UseFormRegister } from "react-hook-form"

interface SelectProps {
    name: string
    register: UseFormRegister<any>
}

const Select: FC<SelectProps> = ({ name, register }) => {
    return (
        <div>
            <label>Количество ответов для генерации:</label>
            <select defaultValue={3} {...register(name, { required: true })}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
            </select>
        </div>
    )
}

export default Select
