import ActivationErrorPage from "@/pages/ActivationErrorPage"
import ActivationSuccessPage from "@/pages/ActivationSuccessPage"
import AdminPage from "@/pages/AdminPage"
import BlockedUserPage from "@/pages/BlockedUserPage"
import HomePage from "@/pages/HomePage"
import LoginAndRegisterPage from "@/pages/LoginAndRegisterPage"
import TestPage from "@/pages/TestPage"
import UserProfilePage from "@/pages/UserProfilePage"
import { Navigate, Route } from "react-router-dom"

export const authenticatedRoutes = [
    <Route key="home" path="/home" element={<HomePage />} />,
    <Route key="test" path="/test" element={<TestPage />} />,
    <Route key="profile" path="/profile" element={<UserProfilePage />} />,
    // Динамическая проверка isAdmin переносится в AppRouter
]

export const publicRoutes = [
    <Route key="login" path="/login" element={<LoginAndRegisterPage />} />,
    <Route key="activationError" path="/activation-error" element={<ActivationErrorPage />} />,
    <Route key="activationSuccess" path="/activation-success" element={<ActivationSuccessPage />} />,
]

export const blockedUserRoutes = [<Route key="blocked" path="*" element={<BlockedUserPage />} />]
