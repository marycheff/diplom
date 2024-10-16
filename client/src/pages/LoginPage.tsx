import React, { useState } from "react"
import { Tabs, Tab, Box } from "@mui/material"
import LoginForm from "../components/LoginForm"
import RegistrationForm from "../components/RegistrationForm"
//import ResetPasswordForm from "../components/ResetPasswordForm"

const LoginPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0)

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue)
    }

    return (
        <div>
            <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label={activeTab === 0 ? "Вход" : "Вход"} />
                <Tab label={activeTab === 1 ? "Регистрация" : "Регистрация"} />
            </Tabs>

<br /><br />
            <Box>
                {activeTab === 0 && <LoginForm />}
                {activeTab === 1 && <RegistrationForm />}
            </Box>

            {/* <ResetPasswordForm /> */}
        </div>
    )
}

export default LoginPage
