import { genDiff } from "../compare.js"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const fileJson1 = getFixturePath('file1.json')
const fileJson2 = getFixturePath('file2.json')
const fileYaml1 = getFixturePath('file1.yaml')
const fileYaml2 = getFixturePath('file2.yaml')
const result = readFileSync(getFixturePath('result.txt'), 'utf-8')
test('test simple json files find diffs', () => {
    expect(genDiff(fileJson1, fileJson2, 'stylish')).toEqual(result)
})

test('test simple yaml files find diffs', () => {
    expect(genDiff(fileYaml1, fileYaml2, 'stylish')).toEqual(result)
})
