import { Box, Tab, Tabs } from "@mui/material"
import { FC, SyntheticEvent, useState } from "react"
import LoginForm from "../containers/LoginForm"
import RegistrationForm from "../containers/RegistrationForm"
import ResetPasswordForm from "../containers/ResetPasswordForm"

const LoginAndRegisterPage: FC = () => {
    const [activeTab, setActiveTab] = useState(0)
    const [isResetPasswordVisible, setIsResetPasswordVisible] = useState(false)
    const handleTabChange = (event: SyntheticEvent, newValue: number) => {
        setActiveTab(newValue)
        setIsResetPasswordVisible(false)
    }

    const handleResetPasswordClick = () => {
        setIsResetPasswordVisible(true)
    }

    return (
        <div>
            <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="Вход" />
                <Tab label="Регистрация" />
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

export default LoginAndRegisterPage
