#!/usr/bin/env node

// ref: https://scotch.io/@Youngestdev/how-to-build-a-nodejs-commandline-apps-with-yargs
const fs = require('fs');
const argv = require('yargs')
  .usage('Usage: $0 option expenseFile \n e.g $0 -e /path/to/csv')
  .alias('e', 'expenseFile')
  .nargs('e', 1)
  .describe('e', 'Path to csv file containing expenses')
  .demandOption(['e'])
  .help('h')
  .alias('h', 'help').argv;
const expense = require('./lib/expense');

(async () => {
  const result = await expense.process(argv.e);
  xfs.writeFileSync('expenses.json', JSON.stringify(result, null, 2), 'utf8');
})();
