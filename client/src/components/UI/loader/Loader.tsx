import React from "react"
import "./Loader.css" // Импортируем CSS файл

interface LoaderProps {
    text?: string // Необязательный пропс
}

const Loader: React.FC<LoaderProps> = ({ text = "" }) => {
    return (
        <div className='loader-overlay'>
            <div className='loader'></div>
            <div className='loader-text'>{text}</div>
        </div>
    )
}

export default Loader
