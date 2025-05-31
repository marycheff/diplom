import { envConfig } from "@/config/env-config"
import { ApiError } from "@/exceptions"
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

	// Отправка письма активации аккаунта
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

	// Отправка письма для сброса пароля
	async sendResetPasswordMail(to: string, code: string) {
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

	// Отправка письма о блокировке
	async sendUserBlockedMail(to: string, name: string) {
		logger.info(`[${LOG_NAMESPACE}] Отправка письма о блокировке`)
		try {
			await this.transporter.sendMail({
				from: envConfig.SMTP_USER,
				to,
				subject: "Ваш аккаунт заблокирован",
				html: `
                <div>
                    <h1>Здравствуйте, ${name}!</h1>
                    <p>Ваш аккаунт был заблокирован администрацией платформы.</p>
                    <p>Если вы считаете, что это ошибка — свяжитесь с нами.</p>
                </div>
            `,
			})
			logger.info(`[${LOG_NAMESPACE}] Письмо о блокировке успешно отправлено`)
		} catch (error: any) {
			logger.error(`[${LOG_NAMESPACE}] Ошибка при отправке письма о блокировке`, {
				error: error instanceof Error ? error.message : String(error),
			})
			throw ApiError.InternalError()
		}
	}

	// Отправка письма о разблокировке
	async sendUserUnblockedMail(to: string, name: string) {
		logger.info(`[${LOG_NAMESPACE}] Отправка письма о разблокировке`)
		try {
			await this.transporter.sendMail({
				from: envConfig.SMTP_USER,
				to,
				subject: "Ваш аккаунт разблокирован",
				html: `
                <div>
                    <h1>Здравствуйте, ${name}!</h1>
                    <p>Ваш аккаунт был успешно разблокирован. Теперь вы можете снова пользоваться всеми функциями платформы.</p>
                </div>
            `,
			})
			logger.info(`[${LOG_NAMESPACE}] Письмо о разблокировке успешно отправлено`)
		} catch (error: any) {
			logger.error(`[${LOG_NAMESPACE}] Ошибка при отправке письма о разблокировке`, {
				error: error instanceof Error ? error.message : String(error),
			})
			throw ApiError.InternalError()
		}
	}

	// Отправка письма о том, что тест отправлен на модерацию
	async sendModerationPendingMail(to: string, name: string, testTitle: string) {
		logger.info(`[${LOG_NAMESPACE}] Уведомление о статусе 'PENDING'`)
		try {
			await this.transporter.sendMail({
				from: envConfig.SMTP_USER,
				to,
				subject: `Тест "${testTitle}" отправлен на модерацию`,
				html: `
                <div>
                    <h1>Здравствуйте, ${name}!</h1>
                    <p>Ваш тест <strong>"${testTitle}"</strong> успешно отправлен на модерацию. Мы уведомим вас, когда решение будет принято.</p>
                </div>
            `,
			})
		} catch (error) {
			logger.error(`[${LOG_NAMESPACE}] Ошибка при отправке письма о статусе 'PENDING'`, {
				error: error instanceof Error ? error.message : String(error),
			})
		}
	}

	// Отправка письма о том, что тест прошел модерацию
	async sendModerationApprovedMail(to: string, name: string, testTitle: string) {
		logger.info(`[${LOG_NAMESPACE}] Уведомление о статусе 'APPROVED'`)
		try {
			await this.transporter.sendMail({
				from: envConfig.SMTP_USER,
				to,
				subject: `Тест "${testTitle}" прошел модерацию`,
				html: `
                <div>
                    <h1>Поздравляем, ${name}!</h1>
                    <p>Ваш тест <strong>"${testTitle}"</strong> успешно прошёл модерацию и теперь доступен другим пользователям.</p>
                </div>
            `,
			})
		} catch (error) {
			logger.error(`[${LOG_NAMESPACE}] Ошибка при отправке письма о статусе 'APPROVED'`, {
				error: error instanceof Error ? error.message : String(error),
			})
		}
	}

	// Отправка письма о том, что тест был отклонен модерацией
	async sendModerationRejectedMail(to: string, name: string, testTitle: string) {
		logger.info(`[${LOG_NAMESPACE}] Уведомление о статусе 'REJECTED'`)
		try {
			await this.transporter.sendMail({
				from: envConfig.SMTP_USER,
				to,
				subject: `Тест "${testTitle}" отклонён модерацией`,
				html: `
                <div>
                    <h1>Здравствуйте, ${name}!</h1>
                    <p>К сожалению, ваш тест <strong>"${testTitle}"</strong> не прошёл модерацию.</p>
                    <p>Пожалуйста, проверьте требования к контенту и попробуйте снова.</p>
                </div>
            `,
			})
		} catch (error) {
			logger.error(`[${LOG_NAMESPACE}] Ошибка при отправке письма о статусе 'REJECTED'`, {
				error: error instanceof Error ? error.message : String(error),
			})
		}
	}
}

export const mailService = new MailService()
