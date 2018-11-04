const expect = require('expect');
const toMatchSnapshot = require('expect-mocha-snapshot');
const expense = require('../../lib/expense');

expect.extend({ toMatchSnapshot });

describe('processExpenses', function() {
  describe('processFile', function() {
    it('Processes a small file with two months in each of two years', async function() {
      let result = await expense.process(`${process.cwd()}/test/fixtures/small-data.csv`);
      expect(JSON.stringify(result, null, 2)).toMatchSnapshot(this);
    });

    it('Processes demo data', async function() {
      let result = await expense.process(`${process.cwd()}/test/fixtures/demo-data.csv`);
      expect(JSON.stringify(result, null, 2)).toMatchSnapshot(this);
    });

    it('Processes large data', async function() {
      let result = await expense.process(`${process.cwd()}/test/fixtures/large-data.csv`);
      expect(JSON.stringify(result, null, 2)).toMatchSnapshot(this);
    });
  });
});
