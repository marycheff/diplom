import { Box, Tab, Tabs } from "@mui/material"
import React, { useState } from "react"
import LoginForm from "../components/LoginForm"
import RegistrationForm from "../components/RegistrationForm"
import ResetPasswordForm from "../components/ResetPasswordForm"

const LoginPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0)
    const [isResetPasswordVisible, setIsResetPasswordVisible] = useState(false)
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue)
        setIsResetPasswordVisible(false) // Скрываем форму сброса пароля при переключении вкладок
    }

    const handleResetPasswordClick = () => {
        setIsResetPasswordVisible(true)
    }

    return (
        <div>
            <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label='Вход' />
                <Tab label='Регистрация' />
            </Tabs>

            <br />
            <br />
            <Box>
                {activeTab === 0 && (
                    <div>
                        <LoginForm />
                        {!isResetPasswordVisible && (
                            <p
                                style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                                onClick={handleResetPasswordClick}>
                                Забыли пароль?
                            </p>
                        )}
                    </div>
                )}
                {activeTab === 1 && <RegistrationForm />}
            </Box>

            {/* Показываем форму сброса пароля, если нажали на "Забыли пароль?" */}
            {isResetPasswordVisible && <ResetPasswordForm />}
        </div>
    )
}

export default LoginPage
