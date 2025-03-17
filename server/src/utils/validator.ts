export const isValidObjectId = (id: string): boolean => {
    if (typeof id !== "string" || id.length !== 24) {
        return false
    }
    const hexRegex = /^[0-9a-fA-F]{24}$/
    return hexRegex.test(id)
}
