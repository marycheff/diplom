class MathUtils {
    static generateCode(): string {
        const min = 100000 // минимальное значение (6 цифр)
        const max = 999999 // максимальное значение (6 цифр)
        const code = Math.floor(Math.random() * (max - min + 1)) + min
        return code.toString()
    }
}

export default MathUtils
