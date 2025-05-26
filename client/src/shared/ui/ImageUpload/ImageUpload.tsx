import { ChangeEvent, FC, useRef, useState } from "react"
import styles from "./ImageUpload.module.scss"

interface ImageUploadProps {
    onImageSelect: (base64Image: string) => void
    currentImage?: string
    className?: string
}

const ImageUpload: FC<ImageUploadProps> = ({ onImageSelect, currentImage, className }) => {
    const [preview, setPreview] = useState<string | undefined>(currentImage)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        if (file.size > 5 * 1024 * 1024) {
            // 5MB limit
            alert("Файл слишком большой. Максимальный размер: 5MB")
            return
        }

        const reader = new FileReader()
        reader.onloadend = () => {
            const base64String = reader.result as string
            setPreview(base64String)
            onImageSelect(base64String)
        }
        reader.readAsDataURL(file)
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
        <div className={`${styles.container} ${className || ""}`} onClick={handleClick}>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/jpeg,image/png,image/gif"
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
                    <span>Нажмите, чтобы добавить изображение</span>
                    <span className={styles.subtitle}>JPG, PNG или GIF до 5MB</span>
                </div>
            )}
        </div>
    )
}

export default ImageUpload
