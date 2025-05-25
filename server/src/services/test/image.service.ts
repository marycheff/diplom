import { ApiError } from "@/exceptions"
import fs from "fs"
import path from "path"
import sharp from "sharp"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const UPLOAD_DIR = path.resolve(__dirname, "..", "..", "uploads", "questions")

export class ImageService {
    async saveBase64Image(imageBase64: string, targetId: string): Promise<string> {
        console.log(`Processing image . imageBase64: ${imageBase64}`)
        const matches = imageBase64.trim().match(/^(data:)?image\/(png|jpeg|jpg|gif);base64,(.+)$/i)

        if (!matches) {
            throw ApiError.BadRequest("Некорректный формат изображения")
        }

        const [, extension, base64Data] = matches
        const buffer = Buffer.from(base64Data, "base64")

        if (buffer.length > 5 * 1024 * 1024) {
            throw ApiError.BadRequest("Размер изображения превышает 5MB")
        }

        const metadata = await sharp(buffer).metadata()
        if (!metadata.width || !metadata.height) {
            throw ApiError.BadRequest("Не удалось определить размеры изображения")
        }

        if (metadata.width > 500 || metadata.height > 500) {
            throw ApiError.BadRequest("Изображение должно быть не больше 500×500 пикселей")
        }

        if (!fs.existsSync(UPLOAD_DIR)) {
            fs.mkdirSync(UPLOAD_DIR, { recursive: true })
        }

        const filename = `${targetId}.${extension}`
        const filepath = path.join(UPLOAD_DIR, filename)
        await fs.promises.writeFile(filepath, buffer)

        return `/api/questions/images/${filename}`
    }

    async renameImage(oldId: string, newId: string, extension: string): Promise<string> {
        const oldPath = path.join(UPLOAD_DIR, `${oldId}.${extension}`)
        const newPath = path.join(UPLOAD_DIR, `${newId}.${extension}`)
        await fs.promises.rename(oldPath, newPath)
        return `/api/questions/images/${newId}.${extension}`
    }

    async processImage(imageBase64: string, tempId: string, realId?: string): Promise<string> {
        console.log(`Processing image with tempId: ${tempId}, imageBase64: ${imageBase64}`)
        const matches = imageBase64.trim().match(/^(data:)?image\/(png|jpeg|jpg|gif);base64,(.+)$/i)

        if (!matches) {
            throw ApiError.BadRequest("Некорректный формат изображения!!")
        }

        // Extract components - matches[2] is the extension, matches[3] is the base64 data
        const extension = matches[2]
        const base64Data = matches[3]
        const buffer = Buffer.from(base64Data, "base64")

        // Check file size (5MB limit)
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

        if (!fs.existsSync(UPLOAD_DIR)) {
            fs.mkdirSync(UPLOAD_DIR, { recursive: true })
        }

        const tempFilename = `${tempId}.${extension}`
        const tempPath = path.join(UPLOAD_DIR, tempFilename)
        await fs.promises.writeFile(tempPath, buffer)

        if (realId) {
            const finalFilename = `${realId}.${extension}`
            const finalPath = path.join(UPLOAD_DIR, finalFilename)
            await fs.promises.rename(tempPath, finalPath)
            return `/api/questions/images/${finalFilename}`
        }

        return `/api/questions/images/${tempFilename}`
    }
}

export const imageService = new ImageService()
