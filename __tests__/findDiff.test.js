import { genDiff } from '../modules/compare.js';
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
const stylishResult = readFileSync(getFixturePath('stylish-result.txt'), 'utf-8')
const plainResult = readFileSync(getFixturePath('plain-result.txt'), 'utf-8')
const stylishResult = readFileSync(getFixturePath('stylish-result.txt'), 'utf-8')
const jsonResult = readFileSync(getFixturePath('json-result.json'), 'utf-8')

test('test json files find diffs (stylish format)', () => {
    expect(genDiff(fileJson1, fileJson2, 'stylish')).toEqual(stylishResult)
})

test('test yaml files find diffs (stylish format)', () => {
    expect(genDiff(fileYaml1, fileYaml2, 'stylish')).toEqual(stylishResult)
})

test('test json files find diffs (plain format)', () => {
    expect(genDiff(fileJson1, fileJson2, 'plain')).toEqual(plainResult)
})

test('test yaml files find diffs (plain format)', () => {
    expect(genDiff(fileYaml1, fileYaml2, 'plain')).toEqual(plainResult)
})

test('test json files find diffs (json format)', () => {
    expect(genDiff(fileJson1, fileJson2, 'json')).toEqual(jsonResult)
})

test('test yaml files find diffs (json format)', () => {
    expect(genDiff(fileYaml1, fileYaml2, 'json')).toEqual(jsonResult)
})