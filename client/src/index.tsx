import React, { createContext } from "react"
import ReactDOM from "react-dom/client"

import App from "./App"
import Store from "./store/store"

interface State {
    store: Store
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

const store = new Store()
export const Context = createContext<State>({
    store,
})

root.render(
    <Context.Provider value={{ store }}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Context.Provider>
)
