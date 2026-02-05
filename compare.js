

const stringify = (data, separator = ' ', repeatCount = 1) => {
    if (typeof separator === 'undefined') separator = '';
    if (typeof repeatCount === 'undefined') repeatCount = 0;

    if (typeof data !== 'object' || data === null) {
        return data.toString();
    }

    const result = Object.entries(data).map(([key, value]) => {
        const indent = separator.repeat(repeatCount);
        const innerIndent = separator.repeat(repeatCount + 4);
        if (typeof value === 'object' && value !== null) {
            // Обработка вложенного объекта
            return `${indent}${key}: {`
                + `\n${stringify(value, separator, repeatCount + 4)}`
                + `\n${innerIndent}}`
        } else {
            // Простое значение
            return `${indent}${key}: ${value}`;
        }
    });

    return result.join('\n')
};

// const stringify = (data, separator = ' ', repeatCount = 0) => {
//     const innerContent = stringify1(data, separator, repeatCount);
//     // Вырезаем 1 уровень отступа, чтобы открыть и закрыть
//     return `{\n${innerContent}\n}`;
// };

function genDiff(data1, data2) {
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
    // проверка, является ли объектом значение если ключ одинаковый
    const areBothValuesObject = (data1, data2) => {
        return typeof data1 === 'object' && typeof data2 === 'object'
    }

    const whichValueIsObject = (data1, data2) => {
        if (typeof data1 === "object" && typeof data2 !== 'object') {
            return data1
        }

        if (typeof data2 === "object" && typeof data2 !== 'object') {
            return data2
        }

        return false
    }

    const addSpaces = (data) => {
        if (typeof data !== 'object' || data === null) {
            // Если данные не являются объектом, возвращаем их как есть
            return data;
        }

        // Обработка каждого ключа и значения объекта
        const result = Object.entries(data).reduce((acc, [key, value]) => {
            const newKey = ` ${key}`
            if (typeof value === 'object' && value !== null) {
                // Если значение — объект, вызываем рекурсию
                const nested = addSpaces(value);
                acc[newKey] = nested
                // return { [`${key}`]: nested }; // добавляем пробел
            } else {
                // Для примитивных значений создаем массив с пробелом
                // return { [`${key}`]: value };
                acc[newKey] = value
            }
            return acc
        }, {});

        return result;
    };

    let modifiedData = []

    modifiedData = Object.entries(data1).reduce((acc, el) => {
        const [key, value] = el
        // если ключи одинаковые 
        if (areKeysSimilar(el, data2)) {
            // если значение у двух файлов являются объектами, то сравниваем объекты с помощью рекурсии
            if (areBothValuesObject(value, data2[key])) {
                const res = genDiff(value, data2[key])
                const newEl = [key, res, ' ', 1]
                acc.push(newEl)
            }
            // если значения одинаковые то строка не была изменена = возвращаем без знака
            else if (areValuesSimilar(el, data2)) {
                el.push(' ', 1)
                acc.push(el)
            } else
                if (whichValueIsObject !== false) {
                    const valueWithObject = whichValueIsObject(value, data2[key])
                    // если по одинаковому ключу одно значение объект, а второе - нет, добавляем пустые строки перед ключом в это объекте, при этом сам ключ со знаком -
                    const modifiedValue = addSpaces(valueWithObject)
                    // console.log(modifiedValue)
                    const newEl = valueWithObject === value ? [key, modifiedValue, '-', 1] : [key, modifiedValue, '+', 2]
                    acc.push(newEl)

                    // добавляем второй элемент из файла 2 со знаком +
                    const data2Value = valueWithObject === value ? [key, data2[key], '+', 2] : [key, value, '-', 1]
                    acc.push(data2Value)
                }
                else {

                    // если значение по ключу не объекты то возвращаем значение из первоого файла с - и из второго со знаком +
                    el.push('-', 1)
                    acc.push(el)
                    const similarKeyFromData2 = Object.entries(data2).find(([key2]) => key2 === key)
                    similarKeyFromData2.push('+', 2)
                    acc.push(similarKeyFromData2)

                }
        } else {
            // если ключи разные, то значит этой строки нет в файле 2, значит записываем строку со знаком -
            if (typeof value === 'object') {
                const modifiedValue = addSpaces(value)
                const newEl = [key, modifiedValue, '-', 1]
                acc.push(newEl)
            } else {
                el.push('-', 1)
                acc.push(el)
            }
        }
        return acc
    }, [])

    // }

    // находим ключи и значения которых не было в файле 1, записываем с +
    const missingInFirstFileKeys = Object.entries(data2)
        .filter(([key]) => !(key in data1))
        .reduce((acc, el) => {
            const [key, value] = el
            if (typeof value === 'object') {
                const modifiedValue = addSpaces(value)
                const newEl = [key, modifiedValue, '-', 1]
                acc.push(newEl)
            } else {
                el.push('+', 2)
                acc.push(el)
            }
            return acc
        }, [])

    const result = modifiedData
        .concat(missingInFirstFileKeys)
        .sort((a, b) => {
            // сортировка сначала по алфавиту
            if (a[0] < b[0]) return -1;
            if (a[0] > b[0]) return 1;

            // если имена одинаковые, то сначала файл 1 потом файл 2
            return a[3] - b[3];
        })
        .reduce((acc, el) => {
            const [key, value, sign] = el
            const newEl = {}
            const newKey = `${sign} ${key}`
            newEl[newKey] = value
            return { ...acc, ...newEl }
        }, {})

    // console.log(result)
    return stringify(result, " ", 2)
}



export { genDiff }