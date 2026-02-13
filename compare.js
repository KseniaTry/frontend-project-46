import { formatDiff } from "./format.js"
import parseData from "./parsers.js"
// Создаем дерево изменений, где содержатся следующие данные:
// - Ключи — имена ключей.
// - Значения — объекты с полями:
//      status ('unchanged' (без знака), 'added' (знак +), 'removed' (знак -), 'changed' (без знака, так как есть children и знаки внутри дочерних элементов))
//      value (новое значение)
//      oldValue (старое значение, если есть)
//      children (для вложенных объектов если есть, если нет, то поле отсутствует)

// добавление статуса uncganged, чтобы отобразить пробелы (без знака) перед ключом
const addUnchangedStatus = (data) => {
    const modifiedData = Object.entries(data).map(([key, value]) => {
        if (isObject(value)) {
            value = addUnchangedStatus(value)
        }

        return {
            key,
            newValue: value,
            status: 'unchanged'
        }

    })
    return modifiedData
}

// проверка являются ли объектом данные
function isObject(data) {
    return data !== null && typeof data === 'object' && !Array.isArray(data);
}

// генерируем дерево изменений
function getDiff(data1, data2) {

    if (!isObject(data1) || !isObject(data2)) {
        return null
    }
    const allKeys = Array.from(new Set([...Object.keys(data1), ...Object.keys(data2)]))

    const node = allKeys.map((key) => {
        const keyInData1 = key in data1
        const keyInData2 = key in data2
        let status
        let oldValue
        let newValue
        let children

        if (keyInData1 === keyInData2) {
            const valueFromData1 = data1[key] === "" ? " " : data1[key]
            const valueFromData2 = data2[key] === "" ? " " : data2[key]

            if (valueFromData1 === valueFromData2) {
                if (isObject(valueFromData1)) {
                    newValue = addUnchangedStatus(valueFromData1)
                } else {
                    newValue = valueFromData1
                }
                status = 'unchanged'
            }

            if (isObject(valueFromData1) && isObject(valueFromData2)) {
                children = getDiff(valueFromData1, valueFromData2)
                status = 'changed' // без знака
            }

            if ((valueFromData1 !== valueFromData2) && (!isObject(valueFromData1) || !isObject(valueFromData2))) {
                if (isObject(valueFromData1)) {
                    oldValue = addUnchangedStatus(valueFromData1)
                    newValue = valueFromData2
                } else if (isObject(valueFromData2)) {
                    oldValue = valueFromData1
                    newValue = addUnchangedStatus(valueFromData2)
                } else {
                    newValue = valueFromData2
                    oldValue = valueFromData1

                }
                status = 'changed'
            }
        } else {
            if (keyInData1 && !keyInData2) { // удаленный ключ
                status = 'removed'
                if (isObject(data1[key])) {
                    newValue = addUnchangedStatus(data1[key])
                } else {
                    newValue = data1[key]
                }
            }
            if (!keyInData1 && keyInData2) { // добавленный ключ
                status = 'added'
                if (isObject(data2[key])) {
                    newValue = addUnchangedStatus(data2[key])
                } else {
                    newValue = data2[key]
                }
            }
        }

        return {
            ...(key !== undefined ? { key } : {}),
            ...(status !== undefined ? { status } : {}),
            ...(newValue !== undefined ? { newValue: newValue } : {}),
            ...(oldValue !== undefined ? { oldValue: oldValue } : {}),
            ...(children !== undefined ? { children } : {}),
        }
    })

    return node.sort((a, b) => a.key.localeCompare(b.key));
}


function genDiff(filePath1, filePath2, format) {
    const data1 = parseData(filePath1)
    const data2 = parseData(filePath2)

    const diffsNode = getDiff(data1, data2)
    let formattedDiff

    switch (format) {
        case 'stylish':
            formattedDiff = formatDiff(diffsNode)
            break;
    }

    return formattedDiff
}


export { genDiff }