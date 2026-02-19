#!/usr/bin/env node
import { Command } from 'commander';
import { genDiff } from './src/formatters/index.js';

const run = () => {
  const program = new Command();

  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.0')
    .arguments('[filePath1> <filePath2]')
    .option('-f, --format [type]', 'output format', 'stylish')
    .action((filePath1, filePath2) => {
      const options = program.opts();
      const diff = genDiff(filePath1, filePath2, options.format)
      console.log(diff)
    });

  program.parse(process.argv);
}

export { run }