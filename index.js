#!/usr/bin/env node
// ref: https://scotch.io/@Youngestdev/how-to-build-a-nodejs-commandline-apps-with-yargs
const argv = require('yargs')
  .usage('Usage: $0 option expenseFile \n e.g $0 -e /path/to/csv')
  .alias('e', 'expenseFile')
  .nargs('e', 1)
  .describe('e', 'Path to csv file containing expenses')
  .demandOption(['e'])
  .help('h')
  .alias('h', 'help').argv;
// const logger = require('./lib/logger');
const processExpenses = require('./lib/process-expenses');

(async () => {
  const result = await processExpenses.processFile(argv.expenseFile);
  // TODO write result to output file
  // logger.info('result', { data: result });
  console.log(JSON.stringify(result, null, 2)); // eslint-disable-line no-console
})();
