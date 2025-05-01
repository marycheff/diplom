import InternetConnectionStatus from "@/shared/ui/InternetConnection/InternetConnectionStatus"
import { Toaster } from "react-hot-toast"
import { BrowserRouter } from "react-router-dom"
import AppRouter from "./router/AppRouter"
import "./styles/global.scss"
const App = () => {
    return (
        <BrowserRouter>
            <InternetConnectionStatus />
            <AppRouter />
            <Toaster position="top-right" reverseOrder={true} />
        </BrowserRouter>
    )
}

export default App
