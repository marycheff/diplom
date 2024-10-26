import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import Loader from "../components/UI/loader/Loader"
import { Context } from "../main"
import ActivationErrorPage from "../pages/ActivationErrorPage"
import ActivationSuccessPage from "../pages/ActivationSuccessPage"
import AdminPage from "../pages/AdminPage"
import BlockedUserPage from "../pages/BlockedUserPage"
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

    if (!authChecked) {
        return <Loader />
    }

    // Маршруты для заблокированных пользователей
    const blockedUserRoutes = [<Route key='blocked' path='*' element={<BlockedUserPage />} />]

    // Маршруты для авторизованных пользователей
    const authenticatedRoutes = [
        <Route key='home' path='/home' element={<HomePage />} />,
        <Route key='test' path='/test' element={<TestPage />} />,
        <Route key='profile' path='/profile' element={<UserProfilePage />} />,
        <Route key='redirect' path='*' element={<Navigate to='/home' />} />,
    ]

    // Маршруты для администратора
    const adminRoutes = [<Route key='admin' path='/admin' element={<AdminPage />} />]

    // Маршруты для неавторизованных пользователей
    const publicRoutes = [
        <Route key='login' path='/login' element={<LoginAndRegisterPage />} />,
        <Route key='redirect' path='*' element={<Navigate to='/login' />} />,
    ]

    // Основные маршруты (доступные всем)
    const generalRoutes = [
        <Route key='activationError' path='/activation-error' element={<ActivationErrorPage />} />,
        <Route key='activationSuccess' path='/activation-success' element={<ActivationSuccessPage />} />,
    ]

    return (
        <div>
            <Routes>
                {generalRoutes}
                {store.user?.isBlocked
                    ? blockedUserRoutes
                    : store.isAuth
                    ? [...authenticatedRoutes, ...(store.isAdmin ? adminRoutes : [])]
                    : publicRoutes}
            </Routes>
            {store.isLoading && <Loader />}
        </div>
    )
}

export default observer(AppRouter)
