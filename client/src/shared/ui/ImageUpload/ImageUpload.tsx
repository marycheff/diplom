import { getImageUrl } from "@/shared/utils"
import React, { ChangeEvent, DragEvent, FC, useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { FaImage } from "react-icons/fa6"
import styles from "./ImageUpload.module.scss"

interface ImageUploadProps {
	onImageSelect: (base64Image: string) => void
	currentImage?: string
	className?: string
}

type UploadMode = "file" | "url"

const ImageUpload: FC<ImageUploadProps> = ({ onImageSelect, currentImage, className }) => {
	const [preview, setPreview] = useState<string | undefined>(currentImage)
	const [isDragging, setIsDragging] = useState(false)
	const [uploadMode, setUploadMode] = useState<UploadMode>("file")
	const [imageUrl, setImageUrl] = useState<string>("")
	const dragCounter = useRef(0)
	const fileInputRef = useRef<HTMLInputElement>(null)
	const urlInputRef = useRef<HTMLInputElement>(null)
	const [isExpanded, setIsExpanded] = useState(!!currentImage)

	useEffect(() => {
		setPreview(getImageUrl(currentImage))
		if (!currentImage && fileInputRef.current) {
			fileInputRef.current.value = ""
		}
		if (!currentImage) {
			setImageUrl("")
		}
	}, [currentImage])

	useEffect(() => {
		if (currentImage) {
			setIsExpanded(true)
		}
	}, [currentImage])

	const validateAndLoadImage = (file: File) => {
		if (file.size > 3 * 1024 * 1024) {
			toast.error("Файл слишком большой. Максимальный размер: 3MB")
			return
		}

		if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
			toast.error("Разрешены только изображения JPG, JPEG и PNG")
			return
		}

		const reader = new FileReader()
		reader.onloadend = () => {
			const base64String = reader.result as string
			const img = new Image()
			img.onload = () => {
				// Если изображение больше 500x500, уменьшение его с сохранением пропорций
				if (img.width > 500 || img.height > 500) {
					resizeImage(img, base64String, file.type)
						.then((resizedBase64) => {
							// Проверка размера сжатого изображения
							const base64Data = resizedBase64.split(",")[1]
							const sizeInBytes = Math.ceil((base64Data.length * 3) / 4)

							if (sizeInBytes > 1 * 1024 * 1024) {
								toast.error("После сжатия файл всё ещё слишком большой. Максимальный размер: 1MB")
								return
							}

							setPreview(resizedBase64)
							onImageSelect(resizedBase64)
						})
						.catch((error) => {
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

	// Функция для валидации URL изображения
	const validateAndLoadImageUrl = (url: string) => {
		// Проверка длины URL
		if (url.length > 255) {
			toast.error("URL слишком длинный. Максимальная длина: 255 символов")
			return
		}

		// Проверка расширения файла
		const validExtensions = [".jpg", ".jpeg", ".png"]
		const hasValidExtension = validExtensions.some((ext) => url.toLowerCase().endsWith(ext))

		if (!hasValidExtension) {
			toast.error("URL должен указывать на изображение формата JPG, JPEG или PNG")
			return
		}

		// Проверка доступности изображения
		const img = new Image()
		img.onload = () => {
			// Если изображение загрузилось успешно
			setPreview(url)
			onImageSelect(url)
		}
		img.onerror = () => {
			toast.error("Не удалось загрузить изображение по указанному URL")
		}
		img.src = url
	}

	// Функция для изменения размера изображения с сохранением пропорций
	const resizeImage = (img: HTMLImageElement, base64: string, mimeType: string): Promise<string> => {
		return new Promise((resolve, reject) => {
			try {
				// Вычисление новых размеров с сохранением пропорций
				let newWidth = img.width
				let newHeight = img.height
				const maxSize = 500

				if (newWidth > maxSize || newHeight > maxSize) {
					if (newWidth > newHeight) {
						// Ограничение по ширине, если ширина больше высоты
						newHeight = Math.round((newHeight * maxSize) / newWidth)
						newWidth = maxSize
					} else {
						// Ограничение по высоте, если высота больше или равна ширине
						newWidth = Math.round((newWidth * maxSize) / newHeight)
						newHeight = maxSize
					}
				}

				// Создание canvas для изменения размера
				const canvas = document.createElement("canvas")
				canvas.width = newWidth
				canvas.height = newHeight
				const ctx = canvas.getContext("2d")

				if (!ctx) {
					reject(new Error("Не удалось получить контекст canvas"))
					return
				}

				// Рисование изображения с новыми размерами
				ctx.drawImage(img, 0, 0, newWidth, newHeight)

				// Получение нового base64 изображения
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

	// Обновление предпросмотра URL при изменении поля ввода
	const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const url = e.target.value
		setImageUrl(url)

		// Проверка, является ли URL изображением и показ предпросмотра
		if (url.trim()) {
			const validExtensions = [".jpg", ".jpeg", ".png"]
			const hasValidExtension = validExtensions.some((ext) => url.toLowerCase().endsWith(ext))

			if (hasValidExtension) {
				// Автоматическая загрузка изображения, если URL валидный
				validateAndLoadImageUrl(url.trim())
			}
		}
	}

	const handleDrop = (event: DragEvent<HTMLDivElement>) => {
		if (uploadMode !== "file") return

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
		if (uploadMode === "file") {
			event.preventDefault()
		}
	}

	const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
		if (uploadMode === "file") {
			event.preventDefault()
			dragCounter.current++
			if (dragCounter.current === 1) setIsDragging(true)
		}
	}

	const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
		if (uploadMode === "file") {
			event.preventDefault()
			dragCounter.current--
			if (dragCounter.current === 0) setIsDragging(false)
		}
	}

	const handleClick = () => {
		if (uploadMode === "file") {
			fileInputRef.current?.click()
		} else if (uploadMode === "url" && urlInputRef.current) {
			urlInputRef.current.focus()
		}
	}

	const handleRemove = (e: React.MouseEvent) => {
		e.stopPropagation()
		setPreview(undefined)
		onImageSelect("")
		if (fileInputRef.current) {
			fileInputRef.current.value = ""
		}
		setImageUrl("")
	}

	const switchMode = (mode: UploadMode) => (e: React.MouseEvent) => {
		e.stopPropagation()
		setUploadMode(mode)
	}

	// Определение, есть ли у нас активное изображение (превью или предпросмотр URL)
	const hasActiveImage = !!preview

	return (
		<>
			<button
				type="button"
				className={styles.toggleButton}
				onClick={() => setIsExpanded((prev) => !prev)}
			>
				<FaImage />
				{isExpanded ? "Скрыть изображение" : "Добавить изображение"}
			</button>

			<div className={`${styles.uploadSection} ${isExpanded ? styles.uploadSectionVisible : ""}`}>
				<div className={styles.uploadContainer}>
					{!currentImage && (
						<div className={styles.modeSwitcher}>
							<button
								type="button"
								className={`${styles.modeButton} ${uploadMode === "file" ? styles.modeActive : ""}`}
								onClick={switchMode("file")}
								disabled={hasActiveImage}
							>
								Загрузить файл
							</button>
							<button
								type="button"
								className={`${styles.modeButton} ${uploadMode === "url" ? styles.modeActive : ""}`}
								onClick={switchMode("url")}
								disabled={hasActiveImage}
							>
								Указать URL
							</button>
						</div>
					)}

					<div
						className={`${styles.dropZone} ${className || ""} ${
							isDragging && uploadMode === "file" ? styles.dragging : ""
						}`}
						onClick={handleClick}
						onDrop={handleDrop}
						onDragOver={handleDragOver}
						onDragEnter={handleDragEnter}
						onDragLeave={handleDragLeave}
					>
						<input
							type="file"
							ref={fileInputRef}
							onChange={handleImageChange}
							accept="image/jpeg,image/png"
							className={styles.fileInput}
						/>

						{uploadMode === "url" && !preview && (
							<div
								onClick={(e) => e.stopPropagation()}
								className={styles.urlInputWrapper}
							>
								<input
									type="text"
									ref={urlInputRef}
									value={imageUrl}
									onChange={handleUrlChange}
									placeholder="Введите URL изображения"
									className={styles.urlInput}
								/>
							</div>
						)}

						{preview ? (
							<div className={styles.previewBox}>
								<img
									src={preview}
									alt="Preview"
									className={styles.previewImage}
								/>
								<button
									onClick={handleRemove}
									className={styles.removePreview}
									type="button"
								>
									✕
								</button>
							</div>
						) : (
							uploadMode === "file" && (
								<div className={styles.placeholder}>
									<span>Нажмите или перетащите изображение сюда</span>
									<span className={styles.placeholderNote}>JPG или PNG до 3MB, не больше 500×500px</span>
								</div>
							)
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default React.memo(ImageUpload)
