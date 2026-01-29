import parseData from "./parsers.js"

function genDiff(filePath1, filePath2) {
    const data1 = parseData(filePath1)
    const data2 = parseData(filePath2)
    // проверка одинаковые ли ключи
    const areKeysSimilar = (el, data) => {
        const [key] = el
        return data[key]
    }
    // проверка одинаковые ли значения у одинаковых ключей
    const areValuesSimilar = (el, data) => {
        const [key, value] = el
        return data[key] === value
    }

    const modifiedData = Object.entries(data1).reduce((acc, el) => {
        const [key] = el
        if (areKeysSimilar(el, data2)) {
            if (areValuesSimilar(el, data2)) {
                el.push(' ', 1)
                acc.push(el)
            } else {
                el.push('-', 1)
                acc.push(el)
                const similarKeyFromData2 = Object.entries(data2).find(([key2]) => key2 === key)
                similarKeyFromData2.push('+', 2)
                acc.push(similarKeyFromData2)
            }
        } else {
            el.push('-', 1)
            acc.push(el)
        }
        return acc
    }, [])

    const missingInFirstFileKeys = Object.entries(data2)
        .filter(([key]) => !(key in data1))
        .map((el) => el.concat('+', 2))

    const result = modifiedData
        .concat(missingInFirstFileKeys)
        .sort()
        .sort((a, b) => a[3] - b[3])
        .reduce((acc, el) => {
            const [key, value, sign] = el
            const newEl = {}
            const newKey = `${sign} ${key}`
            newEl[newKey] = value
            return { ...acc, ...newEl }
        }, {})
    console.log(result)
    return result
}

export { genDiff }