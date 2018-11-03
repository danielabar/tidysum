const fs = require('fs');

function genData(index) {
  // return `2017-10-01,${index},Groceries,Metro\n`;
  return `2017-10-01,1,Groceries,Metro\n`;
}

async function writeRow(stream, index) {
  return new Promise(resolve => {
    stream.write(genData(index), 'utf8', () => resolve());
  });
}

async function createCsv() {
  const stream = fs.createWriteStream('data/sample-data-2.csv');
  for (let i = 1; i <= 10000; i++) {
    await writeRow(stream, i);
  }
  stream.end();
}

createCsv();
