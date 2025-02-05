import envConfig from "@/envConfig"
import ApiError from "@/exceptions/api-error"
import nodemailer from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"

class MailService {
    transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: envConfig.SMTP_HOST,
            port: Number(envConfig.SMTP_PORT),
            secure: true, // Если вам нужен SSL (для порта 465), поставьте true
            auth: {
                user: envConfig.SMTP_USER,
                pass: envConfig.SMTP_PASSWORD,
            },
        } as SMTPTransport.Options) // Указываем тип явно
    }

    async sendActivationMail(to: string, link: string) {
        try {
            await this.transporter.sendMail({
                from: envConfig.SMTP_USER,
                to,
                subject: "Активация аккаунта на " + process.env.API_URL,
                text: "",
                html: `
                <div>
                    <h1>Для активации перейдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                </div>
            `,
            })
        } catch (error: any) {
            if (error.responseCode === 550) {
                throw ApiError.BadRequest(`Ошибка отправки письма: почтовый ящик ${to} не найден`)
            }
            throw ApiError.InternalError()
        }
    }
    async sendResetPasswordMail(to: string, email: string, code: string) {
        try {
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject: "Сброс пароля на " + process.env.API_URL,
                text: "",
                html: `
                <div>
                    <h1>Ваш код для сброса пароля</h1>
                    ${code}
                </div>
            `,
            })
        } catch (error: any) {
            if (error.responseCode === 550) {
                throw ApiError.BadRequest(`Ошибка отправки письма: почтовый ящик ${to} не найден`)
            }
            throw ApiError.InternalError()
        }
    }
}

export default new MailService()
