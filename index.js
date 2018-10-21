#!/usr/bin/env node
const argv = require('yargs').argv;
const logger = require('./lib/logger');
const processExpenses = require('./lib/process-expenses');

// TODO Figure out yargs required args, version and help usage
if (!argv.expenseFile) {
  console.log('Specify path to expenseFile'); // eslint-disable-line no-console
} else {
  (async () => {
    const result = await processExpenses.processFile(argv.expenseFile);
    // TODO write result to output file
    logger.info('result', { data: result });
  })();
}
