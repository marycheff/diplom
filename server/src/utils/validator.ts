// export const isValidObjectId = (id: string): boolean => {
//     if (typeof id !== "string" || id.length !== 24) {
//         return false
//     }
//     const hexRegex = /^[0-9a-fA-F]{24}$/
//     return hexRegex.test(id)
// }

export const isValidObjectId = (id: string): boolean => {
    if (typeof id !== "string") {
        return false
    }
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    return uuidRegex.test(id)
}
