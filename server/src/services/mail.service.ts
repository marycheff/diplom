import { envConfig } from "@/config/env-config"
import ApiError from "@/exceptions/api-error"
import { logger } from "@/utils/logger"
import nodemailer from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"

const LOG_NAMESPACE = "MailService"

class MailService {
    transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: envConfig.SMTP_HOST,
            port: Number(envConfig.SMTP_PORT),
            secure: true,
            auth: {
                user: envConfig.SMTP_USER,
                pass: envConfig.SMTP_PASSWORD,
            },
        } as SMTPTransport.Options)
    }

    async sendActivationMail(to: string, link: string) {
        logger.info(`[${LOG_NAMESPACE}] Отправка письма активации`)
        try {
            await this.transporter.sendMail({
                from: envConfig.SMTP_USER,
                to,
                subject: "Активация аккаунта на " + envConfig.API_URL,
                text: "",
                html: `
                <div>
                    <h1>Для активации перейдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                </div>
            `,
            })
            logger.info(`[${LOG_NAMESPACE}] Письмо активации успешно отправлено`)
        } catch (error: any) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при отправке письма активации`, {
                error: error instanceof Error ? error.message : String(error),
            })
            if (error.responseCode === 550) {
                throw ApiError.BadRequest(`Ошибка отправки письма: почтовый ящик ${to} не найден`)
            }
            throw ApiError.InternalError()
        }
    }
    async sendResetPasswordMail(to: string, email: string, code: string) {
        logger.info(`[${LOG_NAMESPACE}] Отправка письма для сброса пароля`)
        try {
            await this.transporter.sendMail({
                from: envConfig.SMTP_USER,
                to,
                subject: "Сброс пароля на " + envConfig.API_URL,
                text: "",
                html: `
                <div>
                    <h1>Ваш код для сброса пароля</h1>
                    ${code}
                </div>
            `,
            })
            logger.info(`[${LOG_NAMESPACE}] Письмо для сброса пароля успешно отправлено`)
        } catch (error: any) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при отправке письма для сброса пароля`, {
                error: error instanceof Error ? error.message : String(error),
            })
            if (error.responseCode === 550) {
                throw ApiError.BadRequest(`Ошибка отправки письма: почтовый ящик ${to} не найден`)
            }
            throw ApiError.InternalError()
        }
    }
}

export default new MailService()
