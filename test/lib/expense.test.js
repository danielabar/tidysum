const { expect } = require('chai');
const expense = require('../../lib/expense');

describe('processExpenses', function() {
  describe('process', function() {
    it('Contains validation errors', async function() {
      let result = await expense.process(`${process.cwd()}/test/fixtures/invalid-data.csv`);
      expect(result.hasErrors).to.be.true;
      expect(result.errorLines.length).to.eql(2);

      expect(result.errorLines[0].line).to.eql('2021-04,29,194.32,Groceries,Metro');
      expect(result.errorLines[0].description).to.eql('Expected 4 fields, got 5.');

      expect(result.errorLines[1].line).to.eql('2021-04-30,45.87,Electronics');
      expect(result.errorLines[1].description).to.eql('Expected 4 fields, got 3.');

      // Doesn't process year results from file due to validation errors
      expect(result).not.to.have.any.keys('2021');
    });
  });
});
