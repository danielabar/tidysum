const fs = require('fs');
const logger = require('./logger');
const moment = require('moment');
const Decimal = require('decimal.js');

// https://medium.com/@dalaidunc/fs-readfile-vs-streams-to-read-text-files-in-node-js-5dd0710c80ea
async function processFile(file) {
  const output = {};
  return new Promise(resolve => {
    const stream = fs.createReadStream(file, { encoding: 'utf8' });
    stream.on('data', data => {
      logger.debug('stream chunk');
      const lines = data.split('\n');
      lines.forEach(line => processLine(line, output));
      stream.destroy();
    });
    stream.on('close', () => resolve(output));
  });
}

function processLine(line, output) {
  if (!line.length) {
    return;
  }
  const [dateStr, amountStr, category, merchant] = line.split(',');
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
    output[expenseYear].total = calculateTotal(data.amountStr, output[expenseYear].total);
  }
  return expenseYear;
}

function processMonth(data, output, expenseYear) {
  const expenseMonth = moment(data.dateStr).format('MMM');
  if (!output[expenseYear][expenseMonth]) {
    output[expenseYear][expenseMonth] = { total: data.amountStr };
  } else {
    output[expenseYear][expenseMonth].total = calculateTotal(
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
    output[expenseYear][expenseMonth].byCategory[category] = calculateTotal(
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
    output[expenseYear][expenseMonth].byMerchant[merchant] = calculateTotal(
      data.amountStr,
      output[expenseYear][expenseMonth].byMerchant[merchant]
    );
  }
  return merchant;
}

function calculateTotal(amountStr, curTotal) {
  const amountDec = new Decimal(amountStr);
  const curTotalDec = new Decimal(curTotal);
  return amountDec.plus(curTotalDec);
}

module.exports = {
  processFile,
};
