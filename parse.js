import { readFileSync } from 'fs';

const parseData = filePath => console.log(readFileSync((filePath), 'utf8'))

export default parseData