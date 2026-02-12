const SIGNES = {
    'added': '+ ',
    'removed': '- ',
    'unchanged': '  ',
    'changed': '  ',
}

const sortDiff = (data) => {
    return data.sort((a, b) => {
        // сортировка сначала по алфавиту
        if (a[0] < b[0]) return -1;
        if (a[0] > b[0]) return 1;

        // // если имена одинаковые, то сначала файл 1 потом файл 2
        // return a[3] - b[3];
    })
}

function formatDiff(data) {
    const iter = (data, depth) => {
        const lines = [];

        // добавляем открывающие скобки только в начале (для рекурсии они не нужны)
        if (depth === 0) {
            lines.push('{');
        }
        const indent = ' '.repeat(depth + 2)
        const innerIndent = ' '.repeat(depth + 4)

        for (const { key, status, oldValue, newValue, children } of data) {
            const sign = SIGNES[status]

            if ((status === 'changed') && (children)) {
                lines.push(`${indent}${sign}${key}: {`);
                lines.push(...iter(children, depth + 4))
                lines.push(`${innerIndent}}`);
            } else if (oldValue) {
                if (Array.isArray(oldValue)) {
                    lines.push(`${indent}- ${key}: {`);
                    lines.push(...iter(oldValue, depth + 4))
                    lines.push(`${innerIndent}}`);
                    lines.push(`${indent}+ ${key}: ${newValue}`);
                } else {
                    lines.push(`${indent}- ${key}: ${oldValue}`);
                    lines.push(`${indent}+ ${key}: ${newValue}`);
                }
            } else if (!oldValue && Array.isArray(newValue)) {
                lines.push(`${indent}${sign}${key}: {`);
                lines.push(...iter(newValue, depth + 4))
                lines.push(`${innerIndent}}`);
            } else {
                lines.push(`${indent}${sign}${key}: ${newValue}`);
            }

        }

        // добавляем закрывающие скобки только в конце (для рекурсии они не нужны)
        if (depth === 0) {
            lines.push('}');
        }

        return lines;
    };

    return iter(data, 0).join('\n');
}

export { formatDiff }