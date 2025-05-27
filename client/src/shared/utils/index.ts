export const getImageUrl = (image?: string): string | undefined => {
    if (!image) return undefined

    // Проверка на base64
    if (image.startsWith("data:image/")) {
        return image
    }
    // Проверка на путь к API
    if (image.startsWith("/api/")) {
        return `${import.meta.env.VITE_SERVER_URL}${image}`
    }
    return image
}
