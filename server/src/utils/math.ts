export function generateCode(): string {
    const min = 100000 // 6 цифр
    const max = 999999 // 6 цифр
    const code = Math.floor(Math.random() * (max - min + 1)) + min
    return code.toString()
}
