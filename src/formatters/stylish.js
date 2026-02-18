const SIGNES = {
    'added': '+',
    'removed': '-',
    'unchanged': ' ',
    'changed': ' ',
}

// const COMMENTS = {
//     oldValue: ' # Старое значение',
//     newValue: ' # Новое значение',
//     added: ' # Добавлена',
//     deleted: ' # Удалена',
//     empty: '# значения нет, но пробел после : есть',
// }

// const getComment = (sign) => {
//     let comment
//     switch (sign) {
//         case '+':
//             comment = COMMENTS.added
//             break
//         case '-':
//             comment = COMMENTS.deleted
//             break
//         default:
//             comment = ''
//     }
//     return comment
// }

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

        for (const { key, status, oldValue, newValue, children } of data) {
            const sign = SIGNES[status]
            // let comment = getComment(sign)
            // if (newValue === " ") {
            //     comment = COMMENTS.empty
            // }

            if ((status === 'changed') && (children)) {
                lines.push(`${indent}${sign} ${key}: {`);
                lines.push(...iter(children, depth + 4))
                lines.push(`${innerIndent}}`);
            } else if (oldValue) {
                if (Array.isArray(oldValue)) {
                    lines.push(`${indent}- ${key}: {`);
                    lines.push(...iter(oldValue, depth + 4))
                    lines.push(`${innerIndent}}`);
                    newValue === " " ? lines.push(`${indent}+ ${key}: ${newValue}`) : lines.push(`${indent}+ ${key}: ${newValue}`);
                } else {
                    oldValue === " " ? lines.push(`${indent}- ${key}: ${oldValue}`) : lines.push(`${indent}- ${key}: ${oldValue}`);
                    newValue === " " ? lines.push(`${indent}+ ${key}: ${newValue}`) : lines.push(`${indent}+ ${key}: ${newValue}`);
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