import ImageWithFallback from "@/shared/components/ImageWithFallback/ImageWithFallback"
import { getImageUrl } from "@/shared/utils"
import { ChangeEvent, DragEvent, FC, memo, MouseEvent, useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { FaImage } from "react-icons/fa6"
import styles from "./ImageUpload.module.scss"

interface ImageUploadProps {
	onImageSelect: (base64Image: string) => void
	currentImage: string | null
	className?: string
	hideToggleButton?: boolean
	type?: "test" | "question"
}

type UploadMode = "file" | "url"

const ImageUpload: FC<ImageUploadProps> = ({
	onImageSelect,
	currentImage,
	className,
	hideToggleButton = false,
	type = "question",
}) => {
	const [preview, setPreview] = useState<string | null>(currentImage)
	const [isDragging, setIsDragging] = useState(false)
	const [uploadMode, setUploadMode] = useState<UploadMode>("file")
	const [imageUrl, setImageUrl] = useState<string>("")
	const dragCounter = useRef(0)
	const fileInputRef = useRef<HTMLInputElement>(null)
	const urlInputRef = useRef<HTMLInputElement>(null)
	const [isExpanded, setIsExpanded] = useState(!!currentImage)

	const maxDimensions = type === "test" ? { width: 1280, height: 720 } : { width: 500, height: 500 }
	const validExtensions = [".jpg", ".jpeg", ".png"]
	const validMimeTypes = ["image/jpeg", "image/jpg", "image/png"]

	useEffect(() => {
		setPreview(getImageUrl(currentImage) ?? null)
		if (!currentImage) {
			if (fileInputRef.current) fileInputRef.current.value = ""
			setImageUrl("")
		}
	}, [currentImage])

	useEffect(() => {
		if (currentImage || hideToggleButton) setIsExpanded(true)
	}, [currentImage, hideToggleButton])

	const resizeImage = (img: HTMLImageElement, mimeType: string): Promise<string> => {
		return new Promise((resolve, reject) => {
			const { width: maxWidth, height: maxHeight } = maxDimensions
			let { width: newWidth, height: newHeight } = img

			if (newWidth > maxWidth || newHeight > maxHeight) {
				const ratio = Math.min(maxWidth / newWidth, maxHeight / newHeight)
				newWidth = Math.round(newWidth * ratio)
				newHeight = Math.round(newHeight * ratio)
			}

			const canvas = document.createElement("canvas")
			canvas.width = newWidth
			canvas.height = newHeight
			const ctx = canvas.getContext("2d")

			if (!ctx) return reject(new Error("Не удалось получить контекст canvas"))

			ctx.drawImage(img, 0, 0, newWidth, newHeight)
			resolve(canvas.toDataURL(mimeType))
		})
	}

	const processImage = (base64String: string, fileType: string) => {
		const img = new Image()
		img.onload = async () => {
			try {
				// Проверка минимального размера
				if (img.width < 100 || img.height < 100) {
					return toast.error("Изображение слишком маленькое. Минимальный размер: 100×100px")
				}

				const { width: maxWidth, height: maxHeight } = maxDimensions

				if (img.width > maxWidth || img.height > maxHeight) {
					const resizedBase64 = await resizeImage(img, fileType)
					const sizeInBytes = Math.ceil((resizedBase64.split(",")[1].length * 3) / 4)

					if (sizeInBytes > 1024 * 1024) {
						return toast.error("После сжатия файл всё ещё слишком большой. Максимальный размер: 1MB")
					}

					setPreview(resizedBase64)
					onImageSelect(resizedBase64)
				} else {
					setPreview(base64String)
					onImageSelect(base64String)
				}
			} catch (error) {
				console.error("Ошибка при изменении размера изображения:", error)
				toast.error("Не удалось обработать изображение")
			}
		}
		img.src = base64String
	}

	const validateAndLoadImage = (file: File) => {
		if (file.size > 3 * 1024 * 1024) return toast.error("Файл слишком большой. Максимальный размер: 3MB")
		if (!validMimeTypes.includes(file.type)) return toast.error("Разрешены только изображения JPG, JPEG и PNG")

		const reader = new FileReader()
		reader.onloadend = () => processImage(reader.result as string, file.type)
		reader.readAsDataURL(file)
	}

	const validateAndLoadImageUrl = (url: string) => {
		if (url.length > 255) return toast.error("URL слишком длинный. Максимальная длина: 255 символов")
		if (!validExtensions.some((ext) => url.toLowerCase().endsWith(ext))) {
			return toast.error("URL должен указывать на изображение формата JPG, JPEG или PNG")
		}

		const img = new Image()
		img.onload = () => {
			if (img.width < 100 || img.height < 100) {
				return toast.error("Изображение слишком маленькое. Минимальный размер: 100×100px")
			}
			if (img.width > 1920 || img.height > 1080) {
				return toast.error("Изображение слишком большое. Максимальный размер: 1920x1080px")
			}
			setPreview(url)
			onImageSelect(url)
		}
		img.onerror = () => toast.error("Не удалось загрузить изображение по указанному URL")
		img.src = url
	}

	const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) validateAndLoadImage(file)
	}

	const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
		const url = e.target.value
		setImageUrl(url)

		if (url.trim() && validExtensions.some((ext) => url.toLowerCase().endsWith(ext))) {
			validateAndLoadImageUrl(url.trim())
		}
	}

	const handleDrop = (event: DragEvent<HTMLDivElement>) => {
		if (uploadMode !== "file") return

		event.preventDefault()
		dragCounter.current = 0
		setIsDragging(false)

		const files = event.dataTransfer.files
		if (files.length > 1) return toast.error("Можно загрузить только один файл")

		const file = files?.[0]
		if (file) validateAndLoadImage(file)
	}

	const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
		if (uploadMode === "file") event.preventDefault()
	}

	const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
		if (uploadMode === "file") {
			event.preventDefault()
			if (++dragCounter.current === 1) setIsDragging(true)
		}
	}

	const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
		if (uploadMode === "file") {
			event.preventDefault()
			if (--dragCounter.current === 0) setIsDragging(false)
		}
	}

	const handleClick = () => {
		if (uploadMode === "file") {
			fileInputRef.current?.click()
		} else {
			urlInputRef.current?.focus()
		}
	}

	const handleRemove = (e: MouseEvent) => {
		e.stopPropagation()
		setPreview(null)
		onImageSelect("")
		if (fileInputRef.current) fileInputRef.current.value = ""
		setImageUrl("")
	}

	const switchMode = (mode: UploadMode) => (e: MouseEvent) => {
		e.stopPropagation()
		setUploadMode(mode)
	}

	const hasActiveImage = !!preview

	return (
		<>
			{!hideToggleButton && (
				<button
					type="button"
					className={styles.toggleButton}
					onClick={() => setIsExpanded(!isExpanded)}
				>
					<FaImage />
					{isExpanded ? "Скрыть изображение" : "Добавить изображение"}
				</button>
			)}

			<div className={`${styles.uploadSection} ${isExpanded ? styles.uploadSectionVisible : ""}`}>
				<div className={styles.uploadContainer}>
					{!currentImage && (
						<div className={styles.modeSwitcher}>
							{(["file", "url"] as const).map((mode) => (
								<button
									key={mode}
									type="button"
									className={`${styles.modeButton} ${uploadMode === mode ? styles.modeActive : ""}`}
									onClick={switchMode(mode)}
									disabled={hasActiveImage}
								>
									{mode === "file" ? "Загрузить файл" : "Указать URL"}
								</button>
							))}
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
								<ImageWithFallback
									src={preview}
									alt="изображение не загрузилось"
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
									<div className={styles.placeholderMain}>
										<FaImage className={styles.placeholderIcon} />
										<span>Нажмите или перетащите изображение сюда</span>
									</div>
									<span className={styles.placeholderNote}>
										JPG или PNG до 3MB, рекомендуемый размер: {maxDimensions.width}×{maxDimensions.height}px
									</span>
								</div>
							)
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default memo(ImageUpload)
