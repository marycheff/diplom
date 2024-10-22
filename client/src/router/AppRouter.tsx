import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import Loader from "../components/UI/loader/Loader"
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
    const [authChecked, setAuthChecked] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
            if (localStorage.getItem("token")) {
                await store.checkAuth()
            }
            setAuthChecked(true)
        }
        checkAuth()
    }, [store])

    // Не показывать основное содержимое, пока идет проверка токена
    if (!authChecked) {
        return <Loader />
    }

    return (
        <div>
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
            {/* Loader здесь будет наложен поверх основного контента */}
            {store.isLoading && <Loader />}
        </div>
    )
}

export default observer(AppRouter)
