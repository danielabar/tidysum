const csv = require('csv-streamify');
const fs = require('fs');

const NUM_FIELDS = 4;

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
}

module.exports = {
  processFile,
};
