const { expect } = require('chai');
const expense = require('../../lib/expense');

describe('processExpenses', function() {
  describe('process', function() {
    it('Contains validation errors', async function() {
      const result = await expense.process(`${process.cwd()}/test/fixtures/invalid-data.csv`);

      const expectedResult = {
        hasErrors: true,
        lineErrors: [
          {
            line: '2021-04,29,194.32,Groceries,Metro',
            errors: ['Expected 4 fields, got 5.', 'Date format must be YYYY-MM-DD.'],
          },
          {
            line: '2021-04-30,45.87,Electronics',
            errors: ['Expected 4 fields, got 3.'],
          },
        ],
      };
      expect(result).to.deep.equal(expectedResult);

      // Doesn't process year results from file due to validation errors
      expect(result).not.to.have.any.keys('2021');
    });
  });
});
