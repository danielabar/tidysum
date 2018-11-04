const expect = require('expect');
const toMatchSnapshot = require('expect-mocha-snapshot');
const processExpenses = require('../../lib/process-expenses');

expect.extend({ toMatchSnapshot });

describe('processExpenses', () => {
  describe('processFile', () => {
    it('Processes a small file with two months in each of two years', async function() {
      let result = await processExpenses.processFile(
        `${process.cwd()}/test/fixtures/small-test-data.csv`
      );
      expect(JSON.stringify(result, null, 2)).toMatchSnapshot(this);
    });

    it('Processes demo data', async function() {
      let result = await processExpenses.processFile(
        `${process.cwd()}/test/fixtures/demo-data.csv`
      );
      expect(JSON.stringify(result, null, 2)).toMatchSnapshot(this);
    });
  });
});
