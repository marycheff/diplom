export const formatCode = (code: string): string => {
    if (code.length !== 6) {
        return code
    }

    return `${code.slice(0, 3)} ${code.slice(3)}`
}
