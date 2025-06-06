import dotenv from "dotenv"

dotenv.config()

const requiredEnvVars = [
	"JWT_ACCESS_SECRET",
	"JWT_REFRESH_SECRET",
	"SMTP_HOST",
	"SMTP_PORT",
	"SMTP_USER",
	"SMTP_PASSWORD",
	"SERVER_URL",
	"CLIENT_URL",
	"GIGACHAT_AUTH_DATA",
	"GIGACHAT_AUTH_URL",
	"GIGACHAT_URL",
	"GIGACHAT_ANSWERS_MODEL",
	"GIGACHAT_TEST_MODEL",
	"ALLOWED_ORIGINS",
	"NODE_ENV",
]

// Проверка обязательных переменных, кроме DATABASE_URL и REDIS_URL
for (const envVar of requiredEnvVars) {
	if (!process.env[envVar]) {
		throw new Error(`Отсутствует переменная окружения: ${envVar}`)
	}
}

// Логика для DATABASE_URL и REDIS_URL
const isProd = process.env.NODE_ENV === "production"

const REDIS_URL = isProd ? process.env.REDIS_URL_PROD : process.env.REDIS_URL

if (isProd && !REDIS_URL) {
	throw new Error("Отсутствует переменная окружения: REDIS_URL")
}

export const envConfig = {
	REDIS_URL,
	JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
	JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
	SMTP_HOST: process.env.SMTP_HOST!,
	SMTP_PORT: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465,
	SMTP_USER: process.env.SMTP_USER!,
	SMTP_PASSWORD: process.env.SMTP_PASSWORD!,
	SERVER_URL: process.env.SERVER_URL!,
	CLIENT_URL: process.env.CLIENT_URL!,
	GIGACHAT_AUTH_DATA: process.env.GIGACHAT_AUTH_DATA!,
	GIGACHAT_AUTH_URL: process.env.GIGACHAT_AUTH_URL!,
	GIGACHAT_URL: process.env.GIGACHAT_URL!,
	GIGACHAT_ANSWERS_MODEL: process.env.GIGACHAT_ANSWERS_MODEL!,
	GIGACHAT_TEST_MODEL: process.env.GIGACHAT_TEST_MODEL!,
	NODE_ENV: process.env.NODE_ENV || "development",
	PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
	ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
}
