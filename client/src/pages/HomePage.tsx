import React from 'react';
import { useNavigate } from "react-router-dom"

const HomePage = () => {
    const handleClick = () => {
        navigate("/test")
    }
    const navigate = useNavigate()
    return (
        <div>
            HOME
            <button onClick={handleClick}>TEST</button>
        </div>
    )
};

export default HomePage;