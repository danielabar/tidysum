#!/usr/bin/env node

// ref: https://scotch.io/@Youngestdev/how-to-build-a-nodejs-commandline-apps-with-yargs
const fs = require('fs');
const argv = require('yargs')
  .usage(
    'Usage:\n    $0 -e /path/to/expense.csv\nWith optional args:\n    $0 -e /path/to/expense.csv -i 2000 -f 900'
  )
  .alias('e', 'expenseFile')
  .nargs('e', 1)
  .describe('e', 'Path to csv file containing expenses')
  .demandOption(['e'])

  .alias('i', 'monthlyIncome')
  .nargs('i', 1)
  .describe('i', 'Monthly income')

  .alias('f', 'fixedExpenses')
  .nargs('f', 1)
  .describe('f', 'Monthly fixed expenses')

  .help('h')
  .alias('h', 'help').argv;
const expense = require('./lib/expense');
const logger = require('./lib/logger');

(async () => {
  const result = await expense.process(argv.e, argv.i, argv.f);
  if (result.hasErrors) {
    logger.error(JSON.stringify(result.errorLines, null, 2));
  }
  fs.writeFileSync('expenses.json', JSON.stringify(result, null, 2), 'utf8');
})();
