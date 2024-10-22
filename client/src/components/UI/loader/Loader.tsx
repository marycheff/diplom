import React from "react"
import "./Loader.css" // Импортируем CSS файл

const Loader: React.FC = () => {
    return (
        <div className='loader-overlay'>
            <div className='loader'>Загрузка...</div>
        </div>
    )
}

export default Loader
