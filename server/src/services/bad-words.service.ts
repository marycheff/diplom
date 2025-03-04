import * as BadWords from "bad-words"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class BadWordsService {
    private filter: BadWords.Filter
    private customWords: Set<string>

    constructor() {
        this.filter = new BadWords.Filter()
        this.customWords = new Set()
        this.loadCustomWords()
    }

    // Load custom words from the database
    async loadCustomWords(): Promise<void> {
        const customWords = await prisma.badWord.findMany()
        this.customWords = new Set(customWords.map(word => word.word))
        this.updateFilter()
    }

    // Update the filter with custom words
    private updateFilter(): void {
        this.filter = new BadWords.Filter()
        this.filter.addWords(...Array.from(this.customWords))
    }

    // Check if text contains bad words
    isProfane(text: string): boolean {
        return this.filter.isProfane(text)
    }

    // Clean text of bad words
    clean(text: string): string {
        return this.filter.clean(text)
    }

    // Add a new bad word to the database and update the filter
    async addBadWord(word: string, addedBy: string): Promise<void> {
        await prisma.badWord.create({
            data: {
                word,
                addedById: addedBy,
            },
        })
        this.customWords.add(word)
        this.updateFilter()
    }

    // Remove a bad word from the database and update the filter
    async removeBadWord(word: string): Promise<void> {
        await prisma.badWord.delete({
            where: { word },
        })
        this.customWords.delete(word)
        this.updateFilter()
    }
}

export default new BadWordsService()
