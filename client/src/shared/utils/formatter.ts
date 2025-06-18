// Форматирование даты
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
// Форматирование времени
export const formatSeconds = (seconds: number) => {
	const hours = Math.floor(seconds / 3600)
	const minutes = Math.floor((seconds % 3600) / 60)
	const remainingSeconds = seconds % 60

	const formattedTime = [
		hours > 0 ? `${hours} ч.` : "",
		minutes > 0 ? `${minutes} мин.` : "",
		remainingSeconds > 0 ? `${remainingSeconds} сек.` : "",
	]
		.filter(Boolean)
		.join(" ")

	return formattedTime || "0с"
}

// Убрать все лишние пробелы
export const formatSpaces = (str?: string): string => {
	return (str || "").replace(/\s+/g, " ").trim()
}
// Сокращение UUID
export const shortenText = (text: string, length: number = 8): string => {
	if (!text) return ""
	if (text.length <= length) return text
	return `${text.substring(0, length)}...`
}

export const formatApproximateTime = (seconds: number): string => {
	if (seconds <= 0) return ""

	const hours = Math.floor(seconds / 3600)
	const minutes = Math.floor((seconds % 3600) / 60)
	const remainingSeconds = seconds % 60

	if (hours > 0) {
		return `осталось примерно ${hours} ч.`
	} else if (minutes > 0) {
		return `осталось примерно ${minutes} мин.`
	} else {
		return `осталось примерно ${remainingSeconds} сек.`
	}
}

export const calculateRemainingTime = (
	startedAt: string | Date | undefined,
	timeLimit: number | null | undefined
): string | null => {
	console.log(startedAt, timeLimit)
	if (!startedAt || !timeLimit) return null

	const startTime = new Date(startedAt).getTime()
	const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000)
	const remainingSeconds = timeLimit - elapsedSeconds

	if (remainingSeconds <= 0) return null

	return formatApproximateTime(remainingSeconds)
}
