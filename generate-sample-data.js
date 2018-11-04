const moment = require('moment');
const fs = require('fs');

const CATEGORIES = ['Food', 'Clothing', 'Entertainment', 'Gifts', 'Transportation'];
const MERCHANTS = [
  'Merchant A',
  'Merchant B',
  'Merchant C',
  'Merchant D',
  'Merchant E',
  'Merchant F',
];

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function genData(curDate, index) {
  const formattedDate = curDate.format('YYYY-MM-DD');
  const amount = randomIntFromInterval(1, 300);
  let category, merchant;
  category =
    index % 2 == 0 ? CATEGORIES[randomIntFromInterval(0, CATEGORIES.length - 1)] : CATEGORIES[1];
  merchant =
    index % 2 == 0 ? MERCHANTS[randomIntFromInterval(0, MERCHANTS.length - 1)] : MERCHANTS[1];
  return `${formattedDate},${amount},${category},${merchant}\n`;
}

async function writeRow(stream, curDate, index) {
  return new Promise(resolve => {
    stream.write(genData(curDate, index), 'utf8', () => resolve());
  });
}

/**
 * Generate several year's worth of data.
 * Nice to have: accept start and end dates via cli args.
 */
async function createCsv() {
  const start = moment('2017-01-01');
  const end = moment('2018-12-31');
  const stream = fs.createWriteStream('data/sample-data-2.csv');
  let index = 1;
  for (let curDate = moment(start); curDate.diff(end, 'days') <= 0; curDate.add(1, 'days')) {
    //console.log(m.format('YYYY-MM-DD'));
    await writeRow(stream, curDate, index);
    index += 1;
  }
  stream.end();
}

createCsv();
