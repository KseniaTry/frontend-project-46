import { formatDiffInStylish } from "./stylish.js"


import { formatDiffInPlain } from "./plain.js"
import parseData from "../parsers.js"
import { getDiff } from "../compare.js"

function genDiff(filePath1, filePath2, format) {
    const data1 = parseData(filePath1)
    const data2 = parseData(filePath2)

    const diffsNode = getDiff(data1, data2)
    let formattedDiff

    switch (format) {
        case 'stylish':
            formattedDiff = formatDiffInStylish(diffsNode)
            break
        case 'plain':
            formattedDiff = formatDiffInPlain(diffsNode)
            break
        case 'json':
            formattedDiff = formatDiffInPlain(diffsNode)
            break
    }

    return formattedDiff
}

export { genDiff }