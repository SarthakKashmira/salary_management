export const snakeToCamelCase = (string) => string.replace(/(_\w)/g, (letter) => letter[1].toUpperCase())

export const camelToSnakeCase = (string) => string.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
