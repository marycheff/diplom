export const getImageUrl = (image: string | null): string | undefined => {
	if (!image) return undefined

	// Проверка на base64 или URL
	if (image.startsWith("data:image/") || image.startsWith("http://") || image.startsWith("https://")) {
		return image
	}
	// Проверка на путь к API
	if (image.startsWith("/api/")) {
		return `${import.meta.env.VITE_SERVER_URL}${image}`
	}

	return undefined
}
