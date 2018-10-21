#!/usr/bin/env node
const argv = require('yargs').argv;
const processExpenses = require('./lib/process-expenses');

// TODO Figure out yargs required args, version and help usage
if (!argv.expenseFile) {
  console.log('Specify path to expenseFile');
} else {
  // await processExpenses.processFile(argv.expenseFile);
  (async () => {
    await processExpenses.processFile(argv.expenseFile);
  })();
}
