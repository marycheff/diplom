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
