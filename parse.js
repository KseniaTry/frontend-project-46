import { readFileSync } from 'fs';
import { cwd } from 'process';
import YAML from 'yaml'

const normalizeFilePath = path => path.charAt(0) === '/' ? `${cwd()}${path}` : path

const getFileType = path => path.toLowerCase().trim().split('.').at(-1)

const parseData = (filePath) => {
    // const normalizedPath = normalizeFilePath(filePath)
    const fileType = getFileType(filePath)
    const data = readFileSync(filePath, 'utf8')
    let parsedData

    switch (fileType) {
        case 'yml':
            parsedData = YAML.parse(data)
            break
        case 'yaml':
            parsedData = YAML.parse(data)
            break
        case 'json':
            parsedData = JSON.parse(data)
            break
    }
    return parsedData
}

export default parseData