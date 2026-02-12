import { Command } from 'commander';
import { genDiff } from './compare.js';
import parseData from './parsers.js';
import { formatDiff } from './format.js';


const program = new Command();

const changeFormat = (type) => {
  if (type === 'format') {
    console.log(`now is type: ${type}`);
  } else {
    console.log(`Format selected: ${type}`);
  }
};

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.0')
  .arguments('[filePath1> <filePath2]')
  .option('-f, --format [type]', 'output format')
  .action((filePath1, filePath2) => {
    const options = program.opts();
    changeFormat(options.format);
    const data1 = parseData(filePath1)
    const data2 = parseData(filePath2)
    const diff = genDiff(data1, data2)
    console.log(diff)
    console.log(formatDiff(diff))
  });

program.parse(process.argv);