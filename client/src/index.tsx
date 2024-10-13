import { createContext } from "react"
import { createRoot } from "react-dom/client" // Импортируйте createRoot
import App from "./App"
import Store from "./store/store"

interface State {
    store: Store
}

export const store = new Store()

export const Context = createContext<State>({
    store,
})

const container = document.getElementById("root")
const root = createRoot(container!) // Создайте корень

root.render(<App />)
