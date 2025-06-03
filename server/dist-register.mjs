import fs from "fs"
import { createRequire } from "module"
import { dirname, join, relative } from "path"

const require = createRequire(import.meta.url)
const moduleAlias = require("module-alias")

// Регистрация алиасов
moduleAlias.addAlias("@", join(process.cwd(), "dist"))

// Функция для добавления расширений .js к импортам
function processDirectory(directory) {
	try {
		const files = fs.readdirSync(directory)

		for (const file of files) {
			const filePath = join(directory, file)
			const stat = fs.statSync(filePath)

			if (stat.isDirectory()) {
				processDirectory(filePath)
			} else if (file.endsWith(".js")) {
				processFile(filePath)
			}
		}
	} catch (error) {
		console.error(`Ошибка при обработке директории ${directory}: ${error.message}`)
	}
}

function processFile(filePath) {
	try {
		let content = fs.readFileSync(filePath, "utf8")
		let modified = false

		// Регулярное выражение для поиска импортов
		const importRegex = /(?:import|export)\s+(?:(?:[\w*{}\s,]+)\s+from\s+)?['"]([^'"]+)['"]/g

		// Обработка импортов
		content = content.replace(importRegex, (match, importPath) => {
			if (importPath.startsWith("@/") || importPath.startsWith("./") || importPath.startsWith("../")) {
				if (!importPath.endsWith(".js") && !importPath.includes("?") && !importPath.includes("#")) {
					let absolutePath
					if (importPath.startsWith("@/")) {
						// Для алиасов @/
						absolutePath = join(process.cwd(), "dist", importPath.substring(2))
					} else {
						// Для относительных путей
						absolutePath = join(dirname(filePath), importPath)
					}

					const fileWithJs = `${absolutePath}.js`
					const directoryWithIndex = join(absolutePath, "index.js")

					try {
						if (fs.existsSync(fileWithJs)) {
							modified = true
							return match.replace(`"${importPath}"`, `"${importPath}.js"`)
						}

						if (fs.existsSync(directoryWithIndex)) {
							modified = true
							return match.replace(`"${importPath}"`, `"${importPath}/index.js"`)
						}
						modified = true
						return match.replace(`"${importPath}"`, `"${importPath}.js"`)
					} catch (error) {
						modified = true
						return match.replace(`"${importPath}"`, `"${importPath}.js"`)
					}
				}
			}
			return match
		})

		if (modified) {
			try {
				fs.writeFileSync(filePath, content, "utf8")
			} catch (writeError) {
				console.error(`Ошибка при записи файла ${filePath}: ${writeError.message}`)
			}
		}
	} catch (error) {
		console.error(`Ошибка при обработке файла ${filePath}: ${error.message}`)
	}
}

processDirectory(join(process.cwd(), "dist"))

console.log("Все импорты обновлены, запускаем сервер...")

import("./dist/server.js")
