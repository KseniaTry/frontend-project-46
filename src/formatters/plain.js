const modifyValue = (value) => {
    value = value === ' ' ? '' : value

    const modifyedValue = typeof value === 'string' ? `'${value}'` : value

    return Array.isArray(value) ? '[complex value]' : `${modifyedValue}`
}

function formatDiffInPlain(data) {
    const iter = (data, path) => {

        if (!Array.isArray(data)) {
            console.error('Данные не являются массивом:', data);
            return [];
        }

        let lines = []

        for (const { key, status, oldValue, newValue, children } of data) {
            const newPath = path ? `${path}.${key}` : key

            if (status === 'removed') {
                lines.push(`Property '${newPath}' was removed`)
            }

            if (status === 'added') {
                lines.push(`Property '${newPath}' was added with value: ${modifyValue(newValue)}`)
            }

            if ((status === 'changed') && (children)) {
                lines.push(...iter(children, newPath))
            }

            if (oldValue) {
                lines.push(`Property '${newPath}' was updated. From ${modifyValue(oldValue)} to ${modifyValue(newValue)}`)
            }
        }

        return lines
    }
    return iter(data, '', 0).join('\n')
}


export { formatDiffInPlain }