const csv = require('csv-streamify');
const fs = require('fs');
const moment = require('moment');
const calculator = require('./calculator');
const decimalUtil = require('./decimal-util');
const logger = require('./logger');
const recommendation = require('./recommendation');
const validator = require('./validator');

async function process(inputFile, mothlyIn, fixedExp) {
  const validationResult = await validator.processFile(inputFile);
  if (validationResult.hasErrors) return validationResult;

  const expenseSummary = await processFile(inputFile);
  const expenseSummaryWithAvg = calculator.calcAvg(expenseSummary);
  if (mothlyIn && fixedExp) {
    recommendation.determine(expenseSummaryWithAvg, mothlyIn, fixedExp);
  }
  const withYearlyDiff = calculator.calcYearlyDiff(expenseSummaryWithAvg);
  return withYearlyDiff;
}

async function processFile(file) {
  return new Promise(resolve => {
    let counter = 0;
    const output = {};
    const parser = csv();
    parser.on('data', line => {
      processLine(line, output);
      counter += 1;
    });
    parser.on('end', () => {
      logger.debug(`Processed ${counter} lines`);
      resolve(output);
    });
    fs.createReadStream(file, { encoding: 'utf8' }).pipe(parser);
  });
}

function processLine(line, output) {
  const [dateStr, amountStr, category, merchant] = line;
  processEntry({ dateStr, amountStr, category, merchant }, output);
}

function processEntry(data, output) {
  const expenseYear = processYear(data, output);
  const expenseMonth = processMonth(data, output, expenseYear);
  processCategory(data, output, expenseYear, expenseMonth);
  processMerchant(data, output, expenseYear, expenseMonth);
}

function processYear(data, output) {
  const expenseYear = moment(data.dateStr).format('YYYY');
  if (!output[expenseYear]) {
    output[expenseYear] = { total: data.amountStr };
  } else {
    output[expenseYear].total = decimalUtil.sum(data.amountStr, output[expenseYear].total);
  }
  return expenseYear;
}

function processMonth(data, output, expenseYear) {
  const expenseMonth = moment(data.dateStr).format('MMM');
  if (!output[expenseYear][expenseMonth]) {
    output[expenseYear][expenseMonth] = { total: data.amountStr };
  } else {
    output[expenseYear][expenseMonth].total = decimalUtil.sum(
      data.amountStr,
      output[expenseYear][expenseMonth].total
    );
  }
  return expenseMonth;
}

function processCategory(data, output, expenseYear, expenseMonth) {
  const category = data.category;
  if (!output[expenseYear][expenseMonth].byCategory) {
    output[expenseYear][expenseMonth].byCategory = {};
  }
  if (!output[expenseYear][expenseMonth].byCategory[category]) {
    output[expenseYear][expenseMonth].byCategory[category] = data.amountStr;
  } else {
    output[expenseYear][expenseMonth].byCategory[category] = decimalUtil.sum(
      data.amountStr,
      output[expenseYear][expenseMonth].byCategory[category]
    );
  }
  return category;
}

function processMerchant(data, output, expenseYear, expenseMonth) {
  const merchant = data.merchant;
  if (!output[expenseYear][expenseMonth].byMerchant) {
    output[expenseYear][expenseMonth].byMerchant = {};
  }
  if (!output[expenseYear][expenseMonth].byMerchant[merchant]) {
    output[expenseYear][expenseMonth].byMerchant[merchant] = data.amountStr;
  } else {
    output[expenseYear][expenseMonth].byMerchant[merchant] = decimalUtil.sum(
      data.amountStr,
      output[expenseYear][expenseMonth].byMerchant[merchant]
    );
  }
  return merchant;
}

module.exports = {
  process,
};
