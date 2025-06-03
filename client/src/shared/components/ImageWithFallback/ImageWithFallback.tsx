import { useEffect, useState } from "react"
import { MdOutlineImageNotSupported } from "react-icons/md"
import styles from "./ImageWithFallback.module.scss"

interface ImageWithFallbackProps {
	src?: string
	alt?: string
	className?: string
	iconSize?: number
}

const ImageWithFallback = ({ src, alt = "", className = "", iconSize = 48 }: ImageWithFallbackProps) => {
	const [hasError, setHasError] = useState(false)

	useEffect(() => {
		setHasError(!src)
	}, [src])

	if (!src || hasError) {
		return (
			<div className={`${styles.fallbackContainer} ${className}`}>
				<MdOutlineImageNotSupported size={iconSize} />
				{alt && <span className={styles.fallbackAlt}>{alt}</span>}
			</div>
		)
	}

	return (
		<img
			src={src}
			alt={alt}
			className={className}
			onError={() => setHasError(true)}
		/>
	)
}

export default ImageWithFallback
