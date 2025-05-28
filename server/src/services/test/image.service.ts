import { ApiError } from "@/exceptions"
import crypto from "crypto"
import fs from "fs"
import path from "path"
import sharp from "sharp"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const UPLOAD_DIR = path.resolve(__dirname, "..", "..", "..", "uploads", "questions")

export class ImageService {
    async renameImage(oldId: string, newId: string, extension: string): Promise<string> {
        const oldPath = path.join(UPLOAD_DIR, `${oldId}.${extension}`)
        const newPath = path.join(UPLOAD_DIR, `${newId}.${extension}`)
        await fs.promises.rename(oldPath, newPath)
        return `/api/questions/images/${newId}.${extension}`
    }

    async processImage(image: string): Promise<string> {
        console.log(`Processing image: ${image}`)

        if (image.startsWith("/api/questions/images/")) {
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
            const hasValidExtension = validExtensions.some(ext => image.toLowerCase().endsWith(ext))

            if (!hasValidExtension) {
                throw ApiError.BadRequest("URL должен указывать на изображение формата JPG, JPEG или PNG")
            }

            // Возвращаем URL как есть, без сохранения на сервере
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
            console.log(metadata)

            if (!metadata.width || !metadata.height) {
                throw ApiError.BadRequest("Не удалось определить размеры изображения")
            }
        } catch (error) {
            throw ApiError.BadRequest("Неверный формат изображения")
        }

        if (metadata.width > 500 || metadata.height > 500) {
            throw ApiError.BadRequest("Изображение должно быть не больше 500×500 пикселей")
        }

        if (!fs.existsSync(UPLOAD_DIR)) {
            fs.mkdirSync(UPLOAD_DIR, { recursive: true })
        }

        // Генерация UUID для имени файла
        const fileId = crypto.randomUUID()
        const filename = `${fileId}.${extension}`
        const filePath = path.join(UPLOAD_DIR, filename)
        await fs.promises.writeFile(filePath, buffer)

        return `/api/questions/images/${filename}`
    }

    async deleteImage(imagePath: string): Promise<void> {
        // Не удаляем внешние ссылки
        if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
            return
        }

        const filename = path.basename(imagePath)
        const fullPath = path.join(UPLOAD_DIR, filename)
        try {
            await fs.promises.unlink(fullPath)
        } catch (err) {
            console.warn(`Не удалось удалить файл изображения: ${fullPath}`, err)
        }
    }
}

export const imageService = new ImageService()
