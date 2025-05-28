import { getImageUrl } from "@/shared/utils"
import React, { ChangeEvent, DragEvent, FC, useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import styles from "./ImageUpload.module.scss"

interface ImageUploadProps {
    onImageSelect: (base64Image: string) => void
    currentImage?: string
    className?: string
}

const ImageUpload: FC<ImageUploadProps> = ({ onImageSelect, currentImage, className }) => {
    const [preview, setPreview] = useState<string | undefined>(currentImage)
    const [isDragging, setIsDragging] = useState(false)
    const dragCounter = useRef(0)
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setPreview(getImageUrl(currentImage))
        if (!currentImage && fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }, [currentImage])
    const validateAndLoadImage = (file: File) => {
        if (file.size > 3 * 1024 * 1024) {
            toast.error("Файл слишком большой. Максимальный размер: 3MB")
            return
        }

        if (!["image/jpeg", "image/png"].includes(file.type)) {
            toast.error("Разрешены только изображения JPG и PNG")
            return
        }

        const reader = new FileReader()
        reader.onloadend = () => {
            const base64String = reader.result as string
            const img = new Image()
            img.onload = () => {
                // Если изображение больше 500x500, уменьшаем его с сохранением пропорций
                if (img.width > 500 || img.height > 500) {
                    resizeImage(img, base64String, file.type)
                        .then(resizedBase64 => {
                            // Проверяем размер сжатого изображения
                            const base64Data = resizedBase64.split(",")[1]
                            const sizeInBytes = Math.ceil((base64Data.length * 3) / 4)

                            if (sizeInBytes > 1 * 1024 * 1024) {
                                toast.error("После сжатия файл всё ещё слишком большой. Максимальный размер: 1MB")
                                return
                            }

                            setPreview(resizedBase64)
                            onImageSelect(resizedBase64)
                        })
                        .catch(error => {
                            console.error("Ошибка при изменении размера изображения:", error)
                            toast.error("Не удалось обработать изображение")
                        })
                } else {
                    setPreview(base64String)
                    onImageSelect(base64String)
                }
            }
            img.src = base64String
        }
        reader.readAsDataURL(file)
    }

    // Функция для изменения размера изображения с сохранением пропорций
    const resizeImage = (img: HTMLImageElement, base64: string, mimeType: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            try {
                // Вычисляем новые размеры с сохранением пропорций
                let newWidth = img.width
                let newHeight = img.height
                const maxSize = 500

                if (newWidth > maxSize || newHeight > maxSize) {
                    if (newWidth > newHeight) {
                        // Ширина больше высоты - ограничиваем по ширине
                        newHeight = Math.round((newHeight * maxSize) / newWidth)
                        newWidth = maxSize
                    } else {
                        // Высота больше или равна ширине - ограничиваем по высоте
                        newWidth = Math.round((newWidth * maxSize) / newHeight)
                        newHeight = maxSize
                    }
                }

                // Создаем canvas для изменения размера
                const canvas = document.createElement("canvas")
                canvas.width = newWidth
                canvas.height = newHeight
                const ctx = canvas.getContext("2d")

                if (!ctx) {
                    reject(new Error("Не удалось получить контекст canvas"))
                    return
                }

                // Рисуем изображение с новыми размерами
                ctx.drawImage(img, 0, 0, newWidth, newHeight)

                // Получаем новое base64 изображение
                const resizedBase64 = canvas.toDataURL(mimeType)
                resolve(resizedBase64)
            } catch (error) {
                reject(error)
            }
        })
    }

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) validateAndLoadImage(file)
    }

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        dragCounter.current = 0
        setIsDragging(false)

        const files = event.dataTransfer.files
        if (files.length > 1) {
            toast.error("Можно загрузить только один файл")
            return
        }

        const file = files?.[0]
        if (file) validateAndLoadImage(file)
    }

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }

    const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        dragCounter.current++
        if (dragCounter.current === 1) setIsDragging(true)
    }

    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        dragCounter.current--
        if (dragCounter.current === 0) setIsDragging(false)
    }

    const handleClick = () => {
        fileInputRef.current?.click()
    }

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation()
        setPreview(undefined)
        onImageSelect("")
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    return (
        <div
            className={`${styles.container} ${className || ""} ${isDragging ? styles.dragging : ""}`}
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/jpeg,image/png"
                className={styles.input}
            />
            {preview ? (
                <div className={styles.previewContainer}>
                    <img src={preview} alt="Preview" className={styles.preview} />
                    <button onClick={handleRemove} className={styles.removeButton} type="button">
                        ✕
                    </button>
                </div>
            ) : (
                <div className={styles.placeholder}>
                    <span>Нажмите или перетащите изображение сюда</span>
                    <span className={styles.subtitle}>JPG или PNG до 3MB, не больше 500×500px</span>
                </div>
            )}
        </div>
    )
}

export default React.memo(ImageUpload)
