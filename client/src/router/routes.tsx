import UserInfo from "@/components/shared/UserInfo"
import ActivationErrorPage from "@/pages/Activation/Error"
import ActivationSuccessPage from "@/pages/Activation/Success"
import AdminPage from "@/pages/Admin/AdminPage"
import BlockedUserPage from "@/pages/BlockedUserPage"
import HomePage from "@/pages/Home/HomePage"
import LoginPage from "@/pages/Login/LoginPage"
import SignupPage from "@/pages/Signup/SignupPage"

import CreateTestPage from "@/pages/CreateTest/CreateTestPage"
import UserProfilePage from "@/pages/UserProfilePage"
import { Navigate, Route } from "react-router-dom"

const commonRoutes = [
    <Route key="activationError" path="/activation-error" element={<ActivationErrorPage />} />,
    <Route key="activationSuccess" path="/activation-success" element={<ActivationSuccessPage />} />,
]
export const authenticatedRoutes = [
    <Route key="home" path="/home" element={<HomePage />} />,
    <Route key="test" path="/test" element={<CreateTestPage />} />,
    <Route key="profile" path="/profile" element={<UserProfilePage />} />,
    ...commonRoutes,
]

export const publicRoutes = [
    <Route key="login" path="/login" element={<LoginPage />} />,
    <Route key="signup" path="/login" element={<SignupPage />} />,
    ...commonRoutes,
]

export const adminRoutes = (isAdmin: boolean) => [
    <Route key="admin" path="/admin" element={isAdmin ? <AdminPage /> : <Navigate to="/home" />} />,
    <Route key="admin-user" path="/admin/user/:userId" element={isAdmin ? <UserInfo /> : <Navigate to="/home" />} />,
]

export const getProtectedRoutes = (isAdmin: boolean) => [
    ...authenticatedRoutes,
    ...adminRoutes(isAdmin),
    <Route key="fallback" path="*" element={<Navigate to="/home" />} />,
]

export const blockedUserRoutes = [<Route key="blocked" path="*" element={<BlockedUserPage />} />]
