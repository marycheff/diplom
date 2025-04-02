import AdminPage from "@/features/admin/pages/AdminPage"
import AllAttemptsPage from "@/features/attempts/pages/AllAttempts/AllAttemptsPage"
import AttemptInfoPage from "@/features/attempts/pages/AttemptInfo/AttemptInfoPage"
import TestAttemptsPage from "@/features/attempts/pages/TestAttempts/TestAttemptsPage"
import ActivationErrorPage from "@/features/auth/pages/ActivationError"
import ActivationSuccessPage from "@/features/auth/pages/ActivationSuccess"
import LoginPage from "@/features/auth/pages/Login/LoginPage"
import SignupPage from "@/features/auth/pages/Signup/SignupPage"
import { useAuthStore } from "@/features/auth/store/useAuthStore"
import AllTestsPage from "@/features/tests/pages/AllTests/AllTestsPage"
import CreateTestPage from "@/features/tests/pages/CreateTest/CreateTestPage"
import MyTestsPage from "@/features/tests/pages/MyTests/MyTestsPage"
import TestInfoPage from "@/features/tests/pages/TestInfo/TestInfoPage"
import AllUsersPage from "@/features/users/pages/AllUsers/AllUsersPage"
import BlockedUserPage from "@/features/users/pages/BlockedUserPage"
import UserInfoPage from "@/features/users/pages/UserInfo/UserInfoPage"
import UserProfilePage from "@/features/users/pages/UserProfilePage"
import HomePage from "@/pages/HomePage"
import InternetConnectionStatus from "@/shared/ui/InternetConnection/InternetConnectionStatus"
import Loader from "@/shared/ui/Loader/Loader"
import { ComponentType, FC, useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

interface AdminRouteProps {
    component: ComponentType<any>
    isAdmin: boolean
}

// Компонент-обертка для маршрутов администраторов
const AdminRoute: FC<AdminRouteProps> = ({ component: Component, isAdmin }) => {
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
        <Route key="create-test" path="/create-test" element={<CreateTestPage />} />,
        <Route key="profile" path="/profile" element={<UserProfilePage />} />,
        <Route key="activationError" path="/activation-error" element={<ActivationErrorPage />} />,
        <Route key="activationSuccess" path="/activation-success" element={<ActivationSuccessPage />} />,
        <Route key="my-tests" path="/my-tests" element={<MyTestsPage />} />,
        <Route key="my-test" path="/my-tests/:testId" element={<TestInfoPage />} />,
        <Route key="my-test-add-questions" path="/my-tests/:testId/add-questions" element={<TestInfoPage />} />,
        <Route key="my-test-edit-settings" path="/my-tests/:testId/edit-settings" element={<TestInfoPage />} />,
    ]

    // Маршруты для администраторов
    const adminRoutes = [
        <Route key="admin" path="/admin" element={<AdminRoute component={AdminPage} isAdmin={isAdmin} />} />,
        <Route
            key="admin-users"
            path="/admin/users"
            element={<AdminRoute component={AllUsersPage} isAdmin={isAdmin} />}
        />,
        <Route
            key="admin-user"
            path="/admin/users/:userId"
            element={<AdminRoute component={UserInfoPage} isAdmin={isAdmin} />}
        />,
        <Route
            key="admin-tests"
            path="/admin/tests"
            element={<AdminRoute component={AllTestsPage} isAdmin={isAdmin} />}
        />,
        <Route
            key="admin-test"
            path="/admin/tests/:testId"
            element={<AdminRoute component={TestInfoPage} isAdmin={isAdmin} />}
        />,
        <Route
            key="admin-test-attempts"
            path="/admin/tests/:testId/attempts"
            element={<AdminRoute component={TestAttemptsPage} isAdmin={isAdmin} />}
        />,
        <Route
            key="admin-test-attempt"
            path="/admin/attempts/:attemptId"
            element={<AdminRoute component={AttemptInfoPage} isAdmin={isAdmin} />}
        />,
        <Route
            key="admin-all-attempts"
            path="/admin/attempts"
            element={<AdminRoute component={AllAttemptsPage} isAdmin={isAdmin} />}
        />,
        <Route
            key="admin-add-questions"
            path="/admin/tests/:testId/add-questions"
            element={<AdminRoute component={TestInfoPage} isAdmin={isAdmin} />}
        />,
        <Route
            key="admin-edit-settings"
            path="/admin/tests/:testId/edit-settings"
            element={<AdminRoute component={TestInfoPage} isAdmin={isAdmin} />}
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
