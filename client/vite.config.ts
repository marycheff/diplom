import react from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	server: {
		// host: "0.0.0.0",
	},
	build: {
		outDir: "dist",
		sourcemap: true
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"), // Корень src
			"@components": path.resolve(__dirname, "./src/components"),
			"@styles": path.resolve(__dirname, "./src/styles")
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use "@styles/variables" as *;`
			}
		}
	},
	base: "/"
})
