import InternetConnectionStatus from "@/components/UI/internetConnection/InternetConnectionStatus"
import Loader from "@/components/UI/loader/Loader"
import ActivationErrorPage from "@/pages/ActivationErrorPage"
import ActivationSuccessPage from "@/pages/ActivationSuccessPage"
import AdminPage from "@/pages/AdminPage"
import BlockedUserPage from "@/pages/BlockedUserPage"
import HomePage from "@/pages/HomePage"
import LoginAndRegisterPage from "@/pages/LoginAndRegisterPage"
import TestPage from "@/pages/TestPage"
import UserProfilePage from "@/pages/UserProfilePage"
import { useAuthStore } from "@/store/useAuthStore"
import { useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

const AppRouter = () => {
    const { user, isAuth, isAdmin, checkAuth, isAuthChecking } = useAuthStore()
    const [authChecked, setAuthChecked] = useState(false)
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token && !isAuth) {
            checkAuth().finally(() => {
                setAuthChecked(true)
            })
        } else {
            setAuthChecked(true)
        }
    }, [checkAuth, isAuth])

    if (isAuthChecking || !authChecked) {
        return <Loader fullScreen />
    }

    // Список публичных маршрутов
    const publicRoutes = [
        <Route key="login" path="/login" element={<LoginAndRegisterPage />} />,
        <Route key="activationError" path="/activation-error" element={<ActivationErrorPage />} />,
        <Route key="activationSuccess" path="/activation-success" element={<ActivationSuccessPage />} />,
    ]

    // Список защищенных маршрутов для авторизованных пользователей
    const authenticatedRoutes = [
        <Route key="home" path="/home" element={<HomePage />} />,
        <Route key="test" path="/test" element={<TestPage />} />,
        <Route key="profile" path="/profile" element={<UserProfilePage />} />,
        <Route key="admin" path="/admin" element={isAdmin ? <AdminPage /> : <Navigate to="/home" />} />,
    ]

    // Маршруты для заблокированных пользователей
    const blockedUserRoutes = [<Route key="blocked" path="*" element={<BlockedUserPage />} />]

    return (
        <>
            <InternetConnectionStatus />
            <Routes>
                {!user && publicRoutes}
                {user?.isBlocked ? (
                    blockedUserRoutes
                ) : isAuth ? (
                    <>
                        {authenticatedRoutes}
                        <Route path="*" element={<Navigate to="/home" />} />
                    </>
                ) : (
                    <Route path="*" element={<Navigate to="/login" />} />
                )}
            </Routes>
        </>
    )
}

export default AppRouter
