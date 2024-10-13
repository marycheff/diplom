import { observer } from "mobx-react-lite"
import React from "react"
import { BrowserRouter } from "react-router-dom"
import AppRouter from "./router/AppRouter"

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    )
}

export default observer(App)
