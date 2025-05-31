import fs from "fs"
import path from "path"
import winston from "winston"
import { envConfig } from "../config/env-config"

// Создание директории для логов, если ее нет
const logDir = path.join(process.cwd(), "logs")
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir, { recursive: true })
}

// Настройка уровней логирования
const levels = {
	error: 0, // Критические ошибки
	warn: 1, // Предупреждения
	info: 2, // Информационные сообщения
	http: 3, // HTTP запросы
	debug: 4, // Отладочная информация
}

// Настройка цветов для консоли
const colors = {
	error: "red",
	warn: "yellow",
	info: "green",
	http: "magenta",
	debug: "white",
}

// Добавление цветов к уровням
winston.addColors(colors)

// Создание форматов для логов
const consoleFormat = winston.format.combine(
	winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
	winston.format.colorize({ all: true }),
	winston.format.printf(
		(info) =>
			`[${info.timestamp}] ${info.level}: ${info.message}${info.stack ? `\n${info.stack}` : ""}${
				info.data ? `\n${JSON.stringify(info.data, null, 2)}` : ""
			}`
	)
)

const fileFormat = winston.format.combine(
	winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
	winston.format.json()
)

// Определение уровня логирования в зависимости от окружения
const level = envConfig.NODE_ENV === "production" ? "info" : "debug"

// Создание массива транспортов
const transports = [
	// Отображение всех логов в консоль
	new winston.transports.Console({
		level,
		format: consoleFormat,
	}),

	// Запись логов уровня error и выше в отдельный файл
	new winston.transports.File({
		filename: path.join(logDir, "error.log"),
		level: "error",
		format: fileFormat,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
	}),

	// Запись всех логов в общий файл
	new winston.transports.File({
		filename: path.join(logDir, "combined.log"),
		level,
		format: fileFormat,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
	}),
]

// Создание и экспорт логгера
export const logger = winston.createLogger({
	levels,
	level,
	transports,
	exitOnError: false,
})
