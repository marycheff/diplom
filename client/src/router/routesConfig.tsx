import AdminPage from "@/features/admin/pages/AdminPage"
import AllAttemptsPage from "@/features/attempts/pages/AllAttempts/AllAttemptsPage"
import AttemptInfoPage from "@/features/attempts/pages/AttemptInfo/AttemptInfoPage"
import AttemptResultsPage from "@/features/attempts/pages/AttemptResults/AttemptResultsPage"
import MyAttemptsPage from "@/features/attempts/pages/MyAttempts/MyAttemptsPage"
import StartAttemptPage from "@/features/attempts/pages/StartAttempt/StartAttemptPage"
import TestAttemptsPage from "@/features/attempts/pages/TestAttempts/TestAttemptsPage"
import TestTaking from "@/features/attempts/pages/TestTaking/TestTaking"
import ActivationErrorPage from "@/features/auth/pages/ActivationError"
import ActivationSuccessPage from "@/features/auth/pages/ActivationSuccess"
import LoginPage from "@/features/auth/pages/Login/LoginPage"
import RegisterPage from "@/features/auth/pages/Register/RegisterPage"
import AllTestsPage from "@/features/tests/pages/AllTests/AllTestsPage"
import UnmoderatedTestsPage from "@/features/tests/pages/AllTests/UnmoderatedTestsPage"
import CreateTestPage from "@/features/tests/pages/CreateTest/CreateTestPage"
import MyTestsPage from "@/features/tests/pages/MyTests/MyTestsPage"
import TestInfoPage from "@/features/tests/pages/TestInfo/TestInfoPage"
import AllUsersPage from "@/features/users/pages/AllUsers/AllUsersPage"
import CreateUserPage from "@/features/users/pages/CreateUser/CreateUserPage"
import UserInfoPage from "@/features/users/pages/UserInfo/UserInfoPage"
import UserProfilePage from "@/features/users/pages/UserProfile/UserProfilePage"
import HomePage from "@/pages/HomePage"
import WelcomePage from "@/pages/WelcomePage"
import { ROUTES } from "@/router/paths"

// Конфигурация админских роутов
export const adminRoutes = [
    { path: ROUTES.ADMIN, element: <AdminPage /> },
    { path: ROUTES.ADMIN_USERS, element: <AllUsersPage /> },
    { path: ROUTES.ADMIN_USER_INFO, element: <UserInfoPage /> },
    { path: ROUTES.ADMIN_CREATE_USER, element: <CreateUserPage /> },
    { path: ROUTES.ADMIN_TESTS, element: <AllTestsPage /> },
    { path: ROUTES.ADMIN_UNMODERATED_TESTS, element: <UnmoderatedTestsPage /> },
    { path: ROUTES.ADMIN_TEST_INFO, element: <TestInfoPage /> },
    { path: ROUTES.ADMIN_TEST_ATTEMPTS, element: <TestAttemptsPage /> },
    { path: ROUTES.ADMIN_ATTEMPT_INFO, element: <AttemptInfoPage /> },
    { path: ROUTES.ADMIN_ALL_ATTEMPTS, element: <AllAttemptsPage /> },
    { path: ROUTES.ADMIN_ADD_QUESTIONS, element: <TestInfoPage /> },
    { path: ROUTES.ADMIN_EDIT_SETTINGS, element: <TestInfoPage /> },
    { path: ROUTES.ADMIN_CREATE_TEST, element: <CreateTestPage /> },
    { path: ROUTES.ADMIN_PROFILE, element: <UserProfilePage /> },
    { path: ROUTES.ADMIN_MY_TESTS, element: <MyTestsPage /> },
    { path: ROUTES.ADMIN_MY_TEST_INFO, element: <TestInfoPage /> },
    { path: ROUTES.ADMIN_MY_ATTEMPTS, element: <MyAttemptsPage /> },
    { path: ROUTES.ADMIN_MY_ATTEMPT_INFO, element: <AttemptInfoPage /> },
]

// Конфигурация пользовательских роутов (для авторизованных пользователей)
export const userRoutes = [
    { path: ROUTES.HOME, element: <HomePage /> },
    { path: ROUTES.CREATE_TEST, element: <CreateTestPage /> },
    { path: ROUTES.PROFILE, element: <UserProfilePage /> },
    { path: ROUTES.MY_TESTS, element: <MyTestsPage /> },
    { path: ROUTES.MY_TEST_INFO, element: <TestInfoPage /> },
    { path: ROUTES.MY_TEST_ADD_QUESTIONS, element: <TestInfoPage /> },
    { path: ROUTES.MY_TEST_EDIT_SETTINGS, element: <TestInfoPage /> },
    { path: ROUTES.MY_ATTEMPTS, element: <MyAttemptsPage /> },
    { path: ROUTES.MY_TEST_ATTEMPTS, element: <TestAttemptsPage /> },
    // TODO: изменить AttemptInfoPage
    { path: ROUTES.MY_TEST_ATTEMPT_INFO, element: <AttemptInfoPage /> },
]
// Конфигурация публичных роутов
export const publicRoutes = [
    { path: ROUTES.START_ATTEMPT, element: <StartAttemptPage /> },
    { path: ROUTES.PASS_ATTEMPT, element: <TestTaking /> },
    { path: ROUTES.ATTEMPT_RESULTS, element: <AttemptResultsPage /> },
    { path: ROUTES.ACTIVATION_ERROR, element: <ActivationErrorPage /> },
    { path: ROUTES.ACTIVATION_SUCCESS, element: <ActivationSuccessPage /> },
]
// Конфигурация роутов для неавторизованных пользователей
export const unauthorizedRoutes = [
    { path: ROUTES.LOGIN, element: <LoginPage /> },
    { path: ROUTES.REGISTER, element: <RegisterPage /> },
    { path: ROUTES.WELCOME, element: <WelcomePage /> },
]
