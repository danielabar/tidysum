const csv = require('csv-streamify');
const fs = require('fs');
const moment = require('moment');

const NUM_FIELDS = 4;
const DATE_FORMAT = 'YYYY-MM-DD';

async function processFile(file) {
  return new Promise(resolve => {
    const output = {
      hasErrors: false,
      errorLines: [],
    };
    const parser = csv();
    parser.on('data', line => {
      validateLine(line, output);
    });
    parser.on('end', () => {
      resolve(output);
    });
    fs.createReadStream(file, { encoding: 'utf8' }).pipe(parser);
  });
}

function validateLine(line, output) {
  if (line.length != NUM_FIELDS) {
    output.hasErrors = true;
    output.errorLines.push({
      line: line.join(','),
      description: `Expected ${NUM_FIELDS} fields, got ${line.length}.`,
    });
  }
  if (line.length > 0) {
    const dateParsed = moment(line[0], DATE_FORMAT, true);
    if (!dateParsed.isValid()) {
      output.hasErrors = true;
      output.errorLines.push({
        line: line.join(','),
        description: `Date format must be ${DATE_FORMAT}.`,
      });
    }
  }
}

module.exports = {
  processFile,
  validateLine,
};
