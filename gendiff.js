import { Command } from 'commander';

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
  .option('-f, --format [type]', 'output format')
  .action(() => {
    const options = program.opts();
    changeFormat(options.format);
  });

program.parse(process.argv);