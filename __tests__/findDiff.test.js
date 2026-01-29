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

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const fileJson1 = getFixturePath('file1.json')
const fileJson2 = getFixturePath('file2.json')
const fileYaml1 = getFixturePath('file1.yaml')
const fileYaml2 = getFixturePath('file2.yaml')

test('test simple json files find diffs', () => {
    expect(genDiff(fileJson1, fileJson2)).toEqual(result)
})

test('test simple yaml files find diffs', () => {
    expect(genDiff(fileYaml1, fileYaml2)).toEqual(result)
})
