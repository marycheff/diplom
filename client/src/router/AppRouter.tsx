import { useAuthStore } from "@/features/auth/store/useAuthStore"
import BlockedUserPage from "@/features/users/pages/BlockedUserPage"
import { adminRoutes, publicRoutes, userRoutes } from "@/router/routesConfig"
import { ROUTES_PATHS } from "@/router/paths"
import InternetConnectionStatus from "@/shared/ui/InternetConnection/InternetConnectionStatus"
import Loader from "@/shared/ui/Loader/Loader"
import { useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

interface Routes {
    element: React.ReactNode
    isAdmin?: boolean
}
// Компонент для защиты пользовательских роутов
const ProtectedRoute = ({ element }: Routes) => {
    const { isAuth } = useAuthStore()
    return isAuth ? element : <Navigate to={ROUTES_PATHS.LOGIN} />
}

// Компонент для защиты админских роутов
const AdminRoute = ({ element, isAdmin }: Routes) => {
    return isAdmin ? element : <Navigate to={ROUTES_PATHS.HOME} />
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

    return (
        <>
            <InternetConnectionStatus />
            <Routes>
                {user?.isBlocked ? (
                    <Route path="*" element={<BlockedUserPage />} />
                ) : (
                    <>
                        {publicRoutes.map(route => (
                            <Route key={route.path} path={route.path} element={route.element} />
                        ))}
                        {userRoutes.map(route => (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={<ProtectedRoute element={route.element} />}
                            />
                        ))}
                        {adminRoutes.map(route => (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={<AdminRoute element={route.element} isAdmin={isAdmin} />}
                            />
                        ))}
                        <Route
                            path="*"
                            element={
                                isAuth ? <Navigate to={ROUTES_PATHS.HOME} /> : <Navigate to={ROUTES_PATHS.LOGIN} />
                            }
                        />
                    </>
                )}
            </Routes>
        </>
    )
}

export default AppRouter
