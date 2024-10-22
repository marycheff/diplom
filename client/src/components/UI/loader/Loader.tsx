import React from "react"
import "./Loader.css" // Импортируем CSS файл

interface LoaderProps {
    text?: string // Необязательный пропс
}

const Loader: React.FC<LoaderProps> = ({ text = "Загрузка..." }) => {
    return (
        <div className='loader-overlay'>
            <div className='loader'>{text}</div>
        </div>
    )
}

export default Loader
