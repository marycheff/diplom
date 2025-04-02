import Breadcrumbs from "@/shared/ui/Breadcrumbs/Breadcrumbs"
import ScrollbarWidthManager from "@/shared/utils/ScrollbarWidthManager"
import { Toaster } from "react-hot-toast"
import { BrowserRouter } from "react-router-dom"
import AppRouter from "./router/AppRouter"
import "./styles/global.scss"
const App = () => {
    return (
        <BrowserRouter>
            <Breadcrumbs />
            <AppRouter />
            <Toaster position="top-right" reverseOrder={true} />
            <ScrollbarWidthManager />
        </BrowserRouter>
    )
}

export default App
