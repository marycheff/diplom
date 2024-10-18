import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Context } from "../main"
import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"
import TestPage from "../pages/TestPage"

const AppRouter: React.FC = () => {
    const { store } = useContext(Context)
    const [authChecked, setAuthChecked] = useState(false) // Новый state для завершения проверки

    useEffect(() => {
        const checkAuth = async () => {
            if (localStorage.getItem("token")) {
                await store.checkAuth() // Ждем завершения checkAuth
            }
            setAuthChecked(true) // Помечаем, что проверка завершена
        }
        checkAuth()
    }, [store])

    // Пока идет проверка токена
    if (store.isLoading || !authChecked) {
        return <div>Загрузка...</div>
    }

    return (
        <Routes>
            {store.isAuth ? (
                <>
                    <Route path='/home' element={<HomePage />} />
                    <Route path='/test' element={<TestPage />} />
                    <Route path='*' element={<Navigate to='/home' />} />
                </>
            ) : (
                <>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='*' element={<Navigate to='/login' />} />
                </>
            )}
        </Routes>
    )
}

export default observer(AppRouter)
