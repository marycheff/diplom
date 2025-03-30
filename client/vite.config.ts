import react from "@vitejs/plugin-react"
import path from "path"
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
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"), // Корень src
            "@components": path.resolve(__dirname, "./src/components"),
            "@styles": path.resolve(__dirname, "./src/styles"),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@styles/_variables" as *;`,
            },
        },
    },
    base: "./",
})
