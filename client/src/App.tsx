import { BrowserRouter } from "react-router-dom"

import { StrictMode } from "react"
import { Toaster } from "react-hot-toast"
import AppRouter from "./router/AppRouter"
const App = () => {
    return (
        <StrictMode>
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
        </StrictMode>
    )
}

export default App
