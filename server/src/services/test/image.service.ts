import { ApiError } from "@/exceptions"
import crypto from "crypto"
import fs from "fs"
import path from "path"
import sharp from "sharp"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const UPLOAD_DIRS = {
	question: path.resolve(__dirname, "..", "..", "..", "uploads", "questions"),
	test: path.resolve(__dirname, "..", "..", "..", "uploads", "tests"),
}

const VALID_EXTENSIONS = [".jpg", ".jpeg", ".png"]
const MAX_DIMENSIONS = {
	test: { width: 1280, height: 720 },
	question: { width: 500, height: 500 },
}

export class ImageService {
	private getUploadDir(type: "test" | "question"): string {
		const dir = UPLOAD_DIRS[type]
		if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
		return dir
	}

	async renameImage(oldId: string, newId: string, extension: string, type: "test" | "question"): Promise<string> {
		const uploadDir = this.getUploadDir(type)
		await fs.promises.rename(
			path.join(uploadDir, `${oldId}.${extension}`),
			path.join(uploadDir, `${newId}.${extension}`)
		)
		return `/api/${type}s/images/${newId}.${extension}`
	}

	async processImage(image: string, type: "test" | "question"): Promise<string> {
		// Если изображение уже обработано
		if (image.startsWith(`/api/${type}s/images/`)) return image

		// Обработка внешних ссылок
		if (image.startsWith("http://") || image.startsWith("https://")) {
			if (image.length > 255) {
				throw ApiError.BadRequest("URL слишком длинный. Максимальная длина: 255 символов")
			}
			if (!VALID_EXTENSIONS.some((ext) => image.toLowerCase().endsWith(ext))) {
				throw ApiError.BadRequest("URL должен указывать на изображение формата JPG, JPEG или PNG")
			}
			return image
		}

		// Обработка base64 изображения
		const matches = image.trim().match(/^(data:)?image\/(png|jpeg|jpg);base64,(.+)$/i)
		if (!matches) throw ApiError.BadRequest("Некорректный формат изображения")

		const [, , extension, base64Data] = matches
		const buffer = Buffer.from(base64Data, "base64")

		if (buffer.length > 3 * 1024 * 1024) {
			throw ApiError.BadRequest("Размер изображения превышает 3MB")
		}

		// Получение метаданных изображения
		let metadata
		try {
			metadata = await sharp(buffer).metadata()
			if (!metadata.width || !metadata.height) {
				throw ApiError.BadRequest("Не удалось определить размеры изображения")
			}
		} catch {
			throw ApiError.BadRequest("Неверный формат изображения")
		}

		// Валидация размеров
		const { width, height } = metadata
		if (width < 100 || height < 100) {
			throw ApiError.BadRequest("Изображение должно быть не меньше 100×100 px")
		}

		const { width: maxWidth, height: maxHeight } = MAX_DIMENSIONS[type]
		if (width > maxWidth || height > maxHeight) {
			throw ApiError.BadRequest(
				`Изображение ${type === "test" ? "теста " : ""}должно быть не больше ${maxWidth}×${maxHeight} px`
			)
		}

		// Сохранение файла
		const filename = `${crypto.randomUUID()}.${extension}`
		const filePath = path.join(this.getUploadDir(type), filename)
		await fs.promises.writeFile(filePath, buffer)

		return `/api/${type}s/images/${filename}`
	}

	async deleteImage(imagePath: string, type: "test" | "question"): Promise<void> {
		// Не удаляем внешние ссылки
		if (imagePath.startsWith("http")) return

		const fullPath = path.join(this.getUploadDir(type), path.basename(imagePath))
		try {
			await fs.promises.unlink(fullPath)
		} catch (err) {
			console.warn(`Не удалось удалить файл изображения: ${fullPath}`, err)
		}
	}
}

export const imageService = new ImageService()
