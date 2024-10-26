import { observer } from "mobx-react-lite"
import React from "react"
import { BrowserRouter } from "react-router-dom"
import { Slide, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import AppRouter from "./router/AppRouter"
const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AppRouter />
            <ToastContainer
                position='top-right'
                autoClose={1000}
                hideProgressBar={false}
                closeOnClick
                newestOnTop
                // pauseOnHover
                theme='light'
                transition={Slide}
            />
        </BrowserRouter>
    )
}

export default observer(App)
