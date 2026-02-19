function formatDiffInJson(data) {
    const result = data.reduce((acc, el) => {
        const { key, status, newValue, children } = el

        if (status === 'removed') {
            return acc;
        }

        if (status === 'changed' && (children)) {
            acc[key] = formatDiffInJson(children)
        } else {
            const modifiedValue = newValue === " " ? "" : newValue
            acc[key] = Array.isArray(newValue) ? formatDiffInJson(newValue) : modifiedValue
        }

        return acc

    }, {})

    return result
}

export { formatDiffInJson }