import InternetConnectionStatus from "@/components/ui/InternetConnection/InternetConnectionStatus"
import Loader from "@/components/ui/Loader/Loader"
import ActivationErrorPage from "@/pages/Activation/Error"
import ActivationSuccessPage from "@/pages/Activation/Success"
import AdminPage from "@/pages/Admin/AdminPage"
import BlockedUserPage from "@/pages/BlockedUserPage"
import HomePage from "@/pages/Home/HomePage"
import LoginPage from "@/pages/Login/LoginPage"
import SignupPage from "@/pages/Signup/SignupPage"
import TestPage from "@/pages/Test/TestPage"
import UserInfoPage from "@/pages/UserInfo/UserInfoPage"
import UserProfilePage from "@/pages/UserProfilePage"
import { useAuthStore } from "@/store/useAuthStore"
import { useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

interface AdminRouteProps {
    component: React.ComponentType
    isAdmin: boolean
}

// Компонент-обертка для маршрутов администраторов
const AdminRoute: React.FC<AdminRouteProps> = ({ component: Component, isAdmin }) => {
    return isAdmin ? <Component /> : <Navigate to="/home" />
}

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
        <Route key="login" path="/login" element={<LoginPage />} />,
        <Route key="signup" path="/signup" element={<SignupPage />} />,
        <Route key="activationError" path="/activation-error" element={<ActivationErrorPage />} />,
        <Route key="activationSuccess" path="/activation-success" element={<ActivationSuccessPage />} />,
    ]

    // Список защищенных маршрутов для авторизованных пользователей
    const authenticatedRoutes = [
        <Route key="home" path="/home" element={<HomePage />} />,
        <Route key="test" path="/test" element={<TestPage />} />,
        <Route key="profile" path="/profile" element={<UserProfilePage />} />,
        <Route key="activationError" path="/activation-error" element={<ActivationErrorPage />} />,
        <Route key="activationSuccess" path="/activation-success" element={<ActivationSuccessPage />} />,
    ]

    // Маршруты для администраторов
    const adminRoutes = [
        <Route key="admin" path="/admin" element={<AdminRoute component={AdminPage} isAdmin={isAdmin} />} />,
        <Route
            key="admin-user"
            path="/admin/user/:userId"
            element={<AdminRoute component={UserInfoPage} isAdmin={isAdmin} />}
        />,
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
                        {adminRoutes}
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
