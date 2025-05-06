import { useAuthStore } from "@/features/auth/store/useAuthStore"
import BlockedUserPage from "@/features/users/pages/BlockedUserPage"
import { ROUTES } from "@/router/paths"
import { adminRoutes, publicRoutes, unauthorizedRoutes, userRoutes } from "@/router/routesConfig"
import Breadcrumbs from "@/shared/ui/Breadcrumbs/Breadcrumbs"
import Loader from "@/shared/ui/Loader/Loader"
import { JSX, useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

interface RouteProps {
    element: JSX.Element
    isAdmin?: boolean
}

const UnauthorizedRoute = ({ element }: RouteProps) => {
    const { isAuth } = useAuthStore()
    return !isAuth ? element : <Navigate to={ROUTES.HOME} />
}

// Компонент для защиты пользовательских роутов
const ProtectedRoute = ({ element }: RouteProps) => {
    const { isAuth } = useAuthStore()
    return isAuth ? element : <Navigate to={ROUTES.LOGIN} />
}

// Компонент для защиты админских роутов
const AdminRoute = ({ element, isAdmin }: RouteProps) => {
    return isAdmin ? element : <Navigate to={ROUTES.HOME} />
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
            <Breadcrumbs />
            <Routes>
                {user?.isBlocked ? (
                    <Route path="*" element={<BlockedUserPage />} />
                ) : (
                    <>
                        {/* Публичные маршруты (доступны всем) */}
                        {publicRoutes.map(route => (
                            <Route key={route.path} path={route.path} element={route.element} />
                        ))}

                        {/* Маршруты для неавторизованных пользователей */}
                        {unauthorizedRoutes.map(route => (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={<UnauthorizedRoute element={route.element} />}
                            />
                        ))}

                        {/* Маршруты для авторизованных пользователей */}
                        {userRoutes.map(route => (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={<ProtectedRoute element={route.element} />}
                            />
                        ))}

                        {/* Админские маршруты */}
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
                                isAuth ? (
                                    isAdmin ? (
                                        <Navigate to={ROUTES.ADMIN} />
                                    ) : (
                                        <Navigate to={ROUTES.HOME} />
                                    )
                                ) : (
                                    <Navigate to={ROUTES.LOGIN} />
                                )
                            }
                        />
                    </>
                )}
            </Routes>
        </>
    )
}

export default AppRouter
