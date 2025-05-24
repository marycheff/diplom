import { logger } from "@/utils/logger"
import fs from "fs"
import path from "path"

const LOG_NAMESPACE = "BadWordsService"

class BadWordsService {
    private initialized: boolean = false
    private regexBadWords: RegExp[] = []
    private plainBadWords: string[] = []
    constructor() {
        this.initBadWords()
    }

    /**
     * Инициализация списка нецензурных слов из файла
     */

    private async initBadWords(): Promise<void> {
        try {
            const filePath = path.join(process.cwd(), "bad_words.txt")
            const fileContent = await fs.promises.readFile(filePath, "utf-8")

            const words = fileContent.split(/\r?\n/).filter(w => w.trim().length > 0)

            for (const raw of words) {
                const word = raw.trim().toLowerCase()

                const isRegex = /[\\.*+?^${}()[\]|]/.test(word)

                if (isRegex) {
                    // Заменяем псевдо-\w и экранируем вручную
                    try {
                        const pattern = word
                            .replace(/\\w\*/g, "[\\p{L}\\p{N}_]*")
                            .replace(/\\w\+/g, "[\\p{L}\\p{N}_]+")
                            .replace(/\\w/g, "[\\p{L}\\p{N}_]")
                            .replace(/[.*+?^${}()|[\]\\]/g, "\\$&") // экранируем всё остальное
                            .replace(/\\\[\\p\{L}\\\\p\{N}_]([*+]?)/g, "[\\p{L}\\p{N}_]$1") // возвращаем \p блоки после экранирования

                        const regex = new RegExp(pattern, "iu") // поддержка Юникода
                        this.regexBadWords.push(regex)
                    } catch (err) {
                        logger.warn(`[${LOG_NAMESPACE}] Невалидный шаблон: ${word}`)
                    }
                } else {
                    this.plainBadWords.push(word)
                }
            }

            this.initialized = true
            logger.info(
                `[${LOG_NAMESPACE}] Загружено ${this.plainBadWords.length} обычных слов и ${this.regexBadWords.length} regex-шаблонов`
            )
        } catch (err) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при загрузке bad_words.txt`, { err })
            throw err
        }
    }

    /**
     * Проверка текста на наличие нецензурных слов
     * @param text Текст для проверки
     * @returns Объект с результатом проверки
     */
    public checkText(text: string): { hasBadWords: boolean; foundWords: string[] } {
        if (!this.initialized) {
            throw new Error("Сервис не инициализирован")
        }

        const normalizedText = this.normalizeText(text.toLowerCase())
        const foundWords: string[] = []

        // Проверка точных слов
        for (const word of this.plainBadWords) {
            if (normalizedText.includes(word)) {
                foundWords.push(word)
            } else {
                // Поддержка маскированных символов между буквами
                const wordPattern = word
                    .split("")
                    .map(c => c.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&"))
                    .join("[\\s._*-]*")
                const regex = new RegExp(wordPattern, "i")
                if (regex.test(normalizedText)) {
                    foundWords.push(word)
                }
            }
        }

        // Проверка регулярных выражений
        for (const regex of this.regexBadWords) {
            if (regex.test(normalizedText)) {
                foundWords.push(regex.source)
            }
        }

        return {
            hasBadWords: foundWords.length > 0,
            foundWords,
        }
    }

    /**
     * Нормализация текста, замена часто используемых символов-заменителей на оригинальные буквы
     * @param text Текст для нормализации
     * @returns Нормализованный текст
     */
    private normalizeText(text: string): string {
        // Замена символов на их буквенные эквиваленты
        return text
            .replace(/[_\-*.\s]+/g, " ") // Заменяем разделители на пробелы
            .replace(/[0о@оо]/g, "о") // Замена разных 'о' на нормальную 'о'
            .replace(/[4чч]/g, "ч") // Замена '4' на 'ч'
            .replace(/[3зз]/g, "з") // Замена '3' на 'з'
            .replace(/[6бб]/g, "б") // Замена '6' на 'б'
            .replace(/[1ии]/g, "и") // Замена '1' на 'и'
            .replace(/[$сс]/g, "с") // Замена '
    }
}

export const badWordsService = new BadWordsService()
