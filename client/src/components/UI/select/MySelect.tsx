import React from "react"
import { UseFormRegister } from "react-hook-form"

interface MySelectProps {
    name: string
    register: UseFormRegister<any>
}

const MySelect: React.FC<MySelectProps> = ({ name, register }) => {
    return (
        <div>
            <label>Количество ответов:</label>
            <select defaultValue={3} {...register(name, { required: true })}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
            </select>
        </div>
    )
}

export default MySelect
