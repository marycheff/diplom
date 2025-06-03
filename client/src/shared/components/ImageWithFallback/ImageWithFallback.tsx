import { memo, useCallback, useEffect, useRef, useState } from "react"
import { MdOutlineImageNotSupported } from "react-icons/md"
import styles from "./ImageWithFallback.module.scss"

interface ImageWithFallbackProps {
	src?: string
	alt?: string
	className?: string
	iconSize?: number
	loading?: "lazy" | "eager"
	priority?: boolean
	preload?: boolean
}

const ImageWithFallback = memo(
	({
		src,
		alt = "",
		className = "",
		iconSize = 48,
		loading = "lazy",
		priority = false,
		preload = false,
	}: ImageWithFallbackProps) => {
		const [hasError, setHasError] = useState(!src)
		const [isLoaded, setIsLoaded] = useState(false)
		const imgRef = useRef<HTMLImageElement>(null)

		// Предзагрузка изображения
		useEffect(() => {
			if (!src || !preload) return

			const img = new Image()
			img.onload = () => setIsLoaded(true)
			img.onerror = () => setHasError(true)
			img.src = src
		}, [src, preload])

		// Обработчик ошибки загрузки
		const handleError = useCallback(() => {
			setHasError(true)
		}, [])

		// Обработчик успешной загрузки
		const handleLoad = useCallback(() => {
			setIsLoaded(true)
			setHasError(false)
		}, [])

		// Intersection Observer для lazy loading
		useEffect(() => {
			if (!src || loading !== "lazy" || !imgRef.current) return

			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							const img = entry.target as HTMLImageElement
							if (img.dataset.src) {
								img.src = img.dataset.src
								img.removeAttribute("data-src")
								observer.unobserve(img)
							}
						}
					})
				},
				{ rootMargin: "50px" }
			)

			if (imgRef.current) {
				observer.observe(imgRef.current)
			}

			return () => observer.disconnect()
		}, [src, loading])

		if (!src || hasError) {
			return (
				<div className={`${styles.fallbackContainer} ${className}`}>
					<MdOutlineImageNotSupported size={iconSize} />
					{alt && <span className={styles.fallbackAlt}>{alt}</span>}
				</div>
			)
		}

		return (
			<div className={`${styles.imageContainer} ${className}`}>
				{!isLoaded && (
					<div className={styles.imagePlaceholder}>
						<div className={styles.skeleton} />
					</div>
				)}
				<img
					ref={imgRef}
					src={loading === "lazy" ? undefined : src}
					data-src={loading === "lazy" ? src : undefined}
					alt={alt}
					className={`${styles.image} ${isLoaded ? styles.loaded : ""}`}
					onError={handleError}
					onLoad={handleLoad}
					loading={loading}
					decoding={priority ? "sync" : "async"}
				/>
			</div>
		)
	}
)

export default ImageWithFallback
