function formatDiffInJson(data) {
    const result = data.reduce((acc, el) => {
        const { key, status, newValue, children } = el

        if (status === 'removed') {
            return acc;
        }

        if (status === 'changed' && (children)) {
            acc[key] = formatDiffInJson(children)
        } else {
            acc[key] = Array.isArray(newValue) ? formatDiffInJson(newValue) : newValue
        }

        return acc

    }, {})
    // console.dir(result, { depth: null, colors: true });
    return result
}

export { formatDiffInJson }