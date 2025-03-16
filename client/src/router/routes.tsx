import ActivationErrorPage from "@/pages/Activation/Error"
import ActivationSuccessPage from "@/pages/Activation/Success"
import AdminPage from "@/pages/Admin/AdminPage"
import BlockedUserPage from "@/pages/BlockedUserPage"
import HomePage from "@/pages/Home/HomePage"
import LoginAndRegisterPage from "@/pages/LoginAndRegisterPage"
import TestPage from "@/pages/Test/TestPage"
import UserProfilePage from "@/pages/UserProfilePage"
import { Navigate, Route } from "react-router-dom"

export const authenticatedRoutes = (isAdmin: boolean) => [
    <Route key="home" path="/home" element={<HomePage />} />,
    <Route key="test" path="/test" element={<TestPage />} />,
    <Route key="profile" path="/profile" element={<UserProfilePage />} />,
    <Route key="admin" path="/admin" element={isAdmin ? <AdminPage /> : <Navigate to="/home" />} />,
]

export const publicRoutes = [
    <Route key="login" path="/login" element={<LoginAndRegisterPage />} />,
    <Route key="activationError" path="/activation-error" element={<ActivationErrorPage />} />,
    <Route key="activationSuccess" path="/activation-success" element={<ActivationSuccessPage />} />,
]

export const blockedUserRoutes = [<Route key="blocked" path="*" element={<BlockedUserPage />} />]
