import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        // port: Number((import.meta as any).env.VITE_PORT || 3020),
    },
})
