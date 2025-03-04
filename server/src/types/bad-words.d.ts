declare module "bad-words" {
    class Filter {
        constructor()
        addWords(...words: string[]): void
        removeWords(...words: string[]): void
        isProfane(text: string): boolean
        clean(text: string): string
    }
    
}

