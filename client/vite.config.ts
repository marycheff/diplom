import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    server: {
        port: 3000,
        host: "0.0.0.0", // Указываем хост для внешнего доступа
    },
    preview: {
        port: 10000,
        host: "0.0.0.0",
        allowedHosts: ["new-diplom.onrender.com"],
    },
    build: {
        outDir: "dist",
        sourcemap: true,
    },
    base: "./",
})
