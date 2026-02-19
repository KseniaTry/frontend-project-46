const SIGNES = {
    'added': '+',
    'removed': '-',
    'unchanged': ' ',
    'changed': ' ',
}

function formatDiffInStylish(data) {
    const iter = (data, depth) => {
        const lines = [];

        // добавляем открывающие скобки только в начале (для рекурсии они не нужны)
        if (depth === 0) {
            lines.push('{');
        }

        const indent = ' '.repeat(depth + 2)
        const innerIndent = ' '.repeat(depth + 4)

        if (!Array.isArray(data)) {
            console.error('Данные не являются массивом:', data);
            return [];
        }

        for (const el of data) {
            const { key, status, oldValue, newValue, children } = el
            const sign = SIGNES[status]

            if ((status === 'changed') && (children)) {
                lines.push(`${indent}${sign} ${key}: {`)
                lines.push(...iter(children, depth + 4))
                lines.push(`${innerIndent}}`)
            } else if ('oldValue' in el) {
                if (Array.isArray(oldValue)) {
                    // const valueWithArray = Array.isArray(oldValue) ? oldValue : newValue
                    lines.push(`${indent}- ${key}: {`);
                    lines.push(...iter(oldValue, depth + 4))
                    lines.push(`${innerIndent}}`)
                    newValue === " " ? lines.push(`${indent}+ ${key}: `) : lines.push(`${indent}+ ${key}: ${newValue}`);
                } else if (Array.isArray(newValue)) {
                    oldValue === " " ? lines.push(`${indent}- ${key}: `) : lines.push(`${indent}- ${key}: ${oldValue}`);
                    lines.push(`${indent}+ ${key}: {`);
                    lines.push(...iter(newValue, depth + 4))
                    lines.push(`${innerIndent}}`)
                } else {
                    oldValue === " " ? lines.push(`${indent}- ${key}: `) : lines.push(`${indent}- ${key}: ${oldValue}`);
                    newValue === " " ? lines.push(`${indent}+ ${key}: `) : lines.push(`${indent}+ ${key}: ${newValue}`);
                }
            } else if (!oldValue && Array.isArray(newValue)) {
                lines.push(`${indent}${sign} ${key}: {`);
                lines.push(...iter(newValue, depth + 4))
                lines.push(`${innerIndent}}`);
            } else {
                lines.push(`${indent}${sign} ${key}: ${newValue}`);
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

export { formatDiffInStylish }