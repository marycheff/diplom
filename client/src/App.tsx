import { observer } from "mobx-react-lite"
import React from "react"
import { BrowserRouter } from "react-router-dom"
// import "react-toastify/dist/ReactToastify.css"
import { Toaster } from "react-hot-toast"
import AppRouter from "./router/AppRouter"
const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AppRouter />
            {/* <ToastContainer
                position="top-right"
                autoClose={500}
                hideProgressBar={false}
                closeOnClick
                newestOnTop
                // pauseOnHover
                theme="light"
                transition={Slide}
            /> */}
            <Toaster position="top-right" reverseOrder={true} />
        </BrowserRouter>
    )
}

export default observer(App)
