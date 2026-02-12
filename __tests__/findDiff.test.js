import { genDiff } from "../compare.js"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const result = `{
//     common: {
//       + follow: false # Добавлена
//         setting1: Value 1
//       - setting2: 200 # Удалена
//       - setting3: true # Старое значение
//       + setting3: null # Новое значение
//       + setting4: blah blah
//       + setting5: {
//             key5: value5
//         }
//         setting6: {
//             doge: {
//               - wow: # значения нет, но пробел после : есть
//               + wow: so much
//             }
//             key: value
//           + ops: vops
//         }
//     }
//     group1: {
//       - baz: bas
//       + baz: bars
//         foo: bar
//       - nest: {
//             key: value
//         }
//       + nest: str
//     }
//   - group2: {
//         abc: 12345
//         deep: {
//             id: 45
//         }
//     }
//   + group3: {
//         deep: {
//             id: {
//                 number: 45
//             }
//         }
//         fee: 100500
//     }
// }`

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const fileJson1 = getFixturePath('file1.json')
const fileJson2 = getFixturePath('file2.json')
const fileYaml1 = getFixturePath('file1.yaml')
const fileYaml2 = getFixturePath('file2.yaml')
const result = readFileSync(getFixturePath('result.txt'), 'utf-8')
// console.log(result)
test('test simple json files find diffs', () => {
    expect(genDiff(fileJson1, fileJson2)).toEqual(result)
})

// test('test simple yaml files find diffs', () => {
//     expect(genDiff(fileYaml1, fileYaml2)).toEqual(result)
// })
