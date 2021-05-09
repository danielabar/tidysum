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

  // Validate number of fields.
  if (line.length != NUM_FIELDS) {
    lineErrorEntry.errors.push(`Expected ${NUM_FIELDS} fields, got ${line.length}.`);
  }

  // Validate date format.
  if (line.length > 0 && !moment(line[0], DATE_FORMAT, true).isValid()) {
    lineErrorEntry.errors.push(`Date format must be ${DATE_FORMAT}.`);
  }

  // Validate numeric
  if (line.length > 1) {
    try {
      new Decimal(line[1]);
    } catch (_) {
      lineErrorEntry.errors.push('Amount must be numeric.');
    }
  }

  // If found at least one thing wrong with this line, add it to the output
  if (lineErrorEntry.errors.length > 0) {
    output.lineErrors.push(lineErrorEntry);
  }
}

module.exports = {
  processFile,
  validateLine,
};
