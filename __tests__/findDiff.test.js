import { genDiff } from "../findDiff.js"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
// import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const result = {
    "- follow": false,
    "  host": 'hexlet.io',
    "- proxy": '123.234.53.22',
    "- timeout": 50,
    "+ timeout": 20,
    "+ verbose": true
}

// console.log(__dirname)
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const file1 = getFixturePath('file1.json')
const file2 = getFixturePath('file2.json')
// const result = getFixturePath('result.txt')
// const resultData = readFileSync(result, 'utf8')
// console.log(file1)

test('test simple json files find diffs', () => {
    expect(genDiff(file1, file2)).toEqual(result)
})