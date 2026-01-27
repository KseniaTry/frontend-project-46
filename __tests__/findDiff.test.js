import genDiff from "../findDiff.js"

const data1 = {
    "host": "hexlet.io",
    "timeout": 50,
    "proxy": "123.234.53.22",
    "follow": false,
    "type": 'module',
    "version": "1.0.0",
}

const data2 = {
    "timeout": 20,
    "verbose": true,
    "host": "hexlet.io",
    "type": 'module',
    "version": "3.6.7",
}

const result = {
    "- follow": false,
    "  host": 'hexlet.io',
    "- proxy": '123.234.53.22',
    "- timeout": 50,
    "+ timeout": 20,
    "  type": 'module',
    "+ verbose": true,
    "- version": "1.0.0",
    "+ version": "3.6.7",
}

test('test simple json files find diffs', () => {
    expect(genDiff(data1, data2)).toEqual(result)
})