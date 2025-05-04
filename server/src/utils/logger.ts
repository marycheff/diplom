import winston from "winston"
import path from "path"
import fs from "fs"
import { envConfig } from "../config/env-config"

// Создаем директорию для логов, если ее нет
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

// Добавляем цвета к уровням
winston.addColors(colors)

// Создаем форматы для логов
const consoleFormat = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        info =>
            `[${info.timestamp}] ${info.level}: ${info.message}${info.stack ? `\n${info.stack}` : ""}${
                info.data ? `\n${JSON.stringify(info.data, null, 2)}` : ""
            }`
    )
)

const fileFormat = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.json()
)

// Определяем уровень логирования в зависимости от окружения
const level = envConfig.NODE_ENV === "production" ? "info" : "debug"

// Создаем массив транспортов
const transports = [
    // Всегда пишем в консоль
    new winston.transports.Console({
        level,
        format: consoleFormat,
    }),

    // Логи уровня error и выше записываем в отдельный файл
    new winston.transports.File({
        filename: path.join(logDir, "error.log"),
        level: "error",
        format: fileFormat,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
    }),

    // Все логи записываем в общий файл
    new winston.transports.File({
        filename: path.join(logDir, "combined.log"),
        level,
        format: fileFormat,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
    }),
]

// Создаем и экспортируем логгер
export const logger = winston.createLogger({
    levels,
    level,
    transports,
    exitOnError: false,
})

// Хелпер для логирования ошибок с сохранением стека вызовов
export function logError(message: string, error: Error, data?: any): void {
    logger.error({
        message,
        stack: error.stack,
        data,
    })
}

// Хелпер для HTTP логирования
export function logHTTP(req: any, res: any, responseTime?: number): void {
    const { method, url, ip, headers } = req

    logger.http({
        message: `${method} ${url} - ${res.statusCode} - ${responseTime || 0}ms`,
        data: {
            method,
            url,
            statusCode: res.statusCode,
            ip,
            userAgent: headers["user-agent"],
            responseTime,
        },
    })
}


