import { ApiError } from "@/exceptions"
import crypto from "crypto"
import fs from "fs"
import path from "path"
import sharp from "sharp"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const QUESTIONS_UPLOAD_DIR = path.resolve(__dirname, "..", "..", "..", "uploads", "questions")
const TESTS_UPLOAD_DIR = path.resolve(__dirname, "..", "..", "..", "uploads", "tests")

export class ImageService {
	private getUploadDir(type: "test" | "question" = "question"): string {
		const dir = type === "test" ? TESTS_UPLOAD_DIR : QUESTIONS_UPLOAD_DIR
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true })
		}
		return dir
	}
	async renameImage(
		oldId: string,
		newId: string,
		extension: string,
		type: "test" | "question"
	): Promise<string> {
		const uploadDir = this.getUploadDir(type)
		const oldPath = path.join(uploadDir, `${oldId}.${extension}`)
		const newPath = path.join(uploadDir, `${newId}.${extension}`)
		await fs.promises.rename(oldPath, newPath)
		return `/api/${type}s/images/${newId}.${extension}`
	}

	async processImage(image: string, type: "test" | "question"): Promise<string> {

		if (image.startsWith(`/api/${type}s/images/`)) {
			return image
		}

		// Проверка на внешнюю ссылку
		if (image.startsWith("http://") || image.startsWith("https://")) {
			// Проверка длины URL
			if (image.length > 255) {
				throw ApiError.BadRequest("URL слишком длинный. Максимальная длина: 255 символов")
			}

			// Проверка расширения файла
			const validExtensions = [".jpg", ".jpeg", ".png"]
			const hasValidExtension = validExtensions.some((ext) => image.toLowerCase().endsWith(ext))

			if (!hasValidExtension) {
				throw ApiError.BadRequest("URL должен указывать на изображение формата JPG, JPEG или PNG")
			}

			// Возвращение URL как есть, без сохранения на сервере
			return image
		}

		// Обработка base64 изображения
		const matches = image.trim().match(/^(data:)?image\/(png|jpeg|jpg);base64,(.+)$/i)

		if (!matches) {
			throw ApiError.BadRequest("Некорректный формат изображения!!")
		}

		const extension = matches[2]
		const base64Data = matches[3]
		const buffer = Buffer.from(base64Data, "base64")

		if (buffer.length > 5 * 1024 * 1024) {
			throw ApiError.BadRequest("Размер изображения превышает 5MB")
		}

		let metadata
		try {
			metadata = await sharp(buffer).metadata()

			if (!metadata.width || !metadata.height) {
				throw ApiError.BadRequest("Не удалось определить размеры изображения")
			}
		} catch (error) {
			throw ApiError.BadRequest("Неверный формат изображения")
		}

		if (metadata.width > 500 || metadata.height > 500) {
			throw ApiError.BadRequest("Изображение должно быть не больше 500×500 пикселей")
		}

		const uploadDir = this.getUploadDir(type)

		// Генерация UUID для имени файла
		const fileId = crypto.randomUUID()
		const filename = `${fileId}.${extension}`
		const filePath = path.join(uploadDir, filename)
		await fs.promises.writeFile(filePath, buffer)

		return `/api/${type}s/images/${filename}`
	}

	async deleteImage(imagePath: string, type: "test" | "question"): Promise<void> {
		// Не удаление внешних ссылок
		if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
			return
		}

		const filename = path.basename(imagePath)
		const fullPath = path.join(this.getUploadDir(type), filename)
		try {
			await fs.promises.unlink(fullPath)
		} catch (err) {
			console.warn(`Не удалось удалить файл изображения: ${fullPath}`, err)
		}
	}
}

export const imageService = new ImageService()
