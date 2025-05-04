import dotenv from "dotenv"
dotenv.config()

const requiredEnvVars = [
    "DATABASE_URL",
    "JWT_ACCESS_SECRET",
    "JWT_REFRESH_SECRET",
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASSWORD",
    "API_URL",
    "CLIENT_URL",
    "GIGACHAT_AUTH_DATA",
    "ALLOWED_ORIGINS",
    "NODE_ENV",
]

for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Отсутствует переменная окружения: ${envVar}`)
    }
}

export const envConfig = {
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    API_URL: process.env.API_URL,
    CLIENT_URL: process.env.CLIENT_URL,
    GIGACHAT_AUTH_DATA: process.env.GIGACHAT_AUTH_DATA,
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
}
