const csv = require('csv-streamify');
const fs = require('fs');
const moment = require('moment');
const Decimal = require('decimal.js');

const NUM_FIELDS = 4;
const DATE_FORMAT = 'YYYY-MM-DD';

async function processFile(file) {
  return new Promise(resolve => {
    const output = {
      hasErrors: false,
      lineErrors: [],
    };
    const parser = csv();
    parser.on('data', line => {
      validateLine(line, output);
    });
    parser.on('end', () => {
      if (output.lineErrors.length > 0) {
        output.hasErrors = true;
      }
      resolve(output);
    });
    fs.createReadStream(file, { encoding: 'utf8' }).pipe(parser);
  });
}

function validateLine(line, output) {
  // Build an entry to record everything that might be wrong with this line.
  const lineErrorEntry = {
    line: line.join(','),
    errors: [],
  };

  validateNumFields(line, lineErrorEntry);
  validateDateFormat(line, lineErrorEntry);
  validateNumeric(line, lineErrorEntry);

  // If found at least one thing wrong with this line, add it to the output
  if (lineErrorEntry.errors.length > 0) {
    output.lineErrors.push(lineErrorEntry);
  }
}

function validateNumFields(line, lineErrorEntry) {
  if (line.length != NUM_FIELDS) {
    lineErrorEntry.errors.push(`Expected ${NUM_FIELDS} fields, got ${line.length}.`);
  }
}

function validateDateFormat(line, lineErrorEntry) {
  if (line.length > 0 && !moment(line[0], DATE_FORMAT, true).isValid()) {
    lineErrorEntry.errors.push(`Date format must be ${DATE_FORMAT}.`);
  }
}

function validateNumeric(line, lineErrorEntry) {
  if (line.length > 1) {
    try {
      new Decimal(line[1]);
    } catch (_) {
      lineErrorEntry.errors.push('Amount must be numeric.');
    }
  }
}

module.exports = {
  processFile,
  validateLine,
};
