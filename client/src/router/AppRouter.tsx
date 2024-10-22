import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Context } from "../main"
import ActivationErrorPage from "../pages/ActivationErrorPage"
import ActivationSuccessPage from "../pages/ActivationSuccessPage"
import AdminPage from "../pages/AdminPage"
import HomePage from "../pages/HomePage"
import LoginAndRegisterPage from "../pages/LoginAndRegisterPage"
import TestPage from "../pages/TestPage"
import UserProfilePage from "../pages/UserProfilePage"

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
            <Route path='/activation-error' element={<ActivationErrorPage />} />
            <Route path='/activation-success' element={<ActivationSuccessPage />} />
            {store.isAuth ? (
                <>
                    <Route path='/home' element={<HomePage />} />
                    <Route path='/test' element={<TestPage />} />
                    <Route path='/profile' element={<UserProfilePage />} />
                    <Route path='*' element={<Navigate to='/home' />} />
                    {store.isAdmin && <Route path='/admin' element={<AdminPage />} />}
                </>
            ) : (
                <>
                    <Route path='/login' element={<LoginAndRegisterPage />} />
                    <Route path='*' element={<Navigate to='/login' />} />
                </>
            )}
        </Routes>
    )
}

export default observer(AppRouter)
