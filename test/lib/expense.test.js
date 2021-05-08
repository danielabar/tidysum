const expect = require('chai');
const expense = require('../../lib/expense');

describe('processExpenses', function() {
  describe('process', function() {
    it('Contains validation errors', async function() {
      let result = await expense.process(`${process.cwd()}/test/fixtures/invalid-data.csv`);
      expect(result.hasErrors).toBe(true);
      expect(result.errorLines.length).toEqual(2);

      expect(result.errorLines[0].line).toEqual('2021-04,29,194.32,Groceries,Metro');
      expect(result.errorLines[0].description).toEqual('Expected 4 fields, got 5.');

      expect(result.errorLines[1].line).toEqual('2021-04-30,45.87,Electronics');
      expect(result.errorLines[1].description).toEqual('Expected 4 fields, got 3.');

      // Doesn't process year results from file due to validation errors
      expect(result['2021']).toNotExist();
    });
  });
});
