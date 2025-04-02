export const formatDate = (date: Date | null) => {
    if (!date) return "Никогда"

    const dateObj = typeof date === "string" ? new Date(date) : date
    return dateObj.toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    })
}


export const formatSeconds = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    const formattedTime = [
        hours > 0 ? `${hours}ч.` : "",
        minutes > 0 ? `${minutes}мин.` : "",
        remainingSeconds > 0 ? `${remainingSeconds}сек.` : "",
    ]
        .filter(Boolean)
        .join(" ")

    return formattedTime || "0с"
}
