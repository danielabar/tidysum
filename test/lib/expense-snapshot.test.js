const expect = require('expect');
const toMatchSnapshot = require('expect-mocha-snapshot');
const expense = require('../../lib/expense');

expect.extend({ toMatchSnapshot });

describe('processExpenses', function() {
  describe('process', function() {
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

    it('Includes savings recommendations', async function() {
      let result = await expense.process(
        `${process.cwd()}/test/fixtures/small-data.csv`,
        1000,
        500
      );
      expect(JSON.stringify(result, null, 2)).toMatchSnapshot(this);
    });

    it('Includes reduce spending recommendations', async function() {
      let result = await expense.process(`${process.cwd()}/test/fixtures/small-data.csv`, 100, 90);
      expect(JSON.stringify(result, null, 2)).toMatchSnapshot(this);
    });
  });
});
