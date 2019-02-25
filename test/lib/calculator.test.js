const calculator = require('../../lib/calculator');
const { expect } = require('chai');

describe('calculator', () => {
  describe('calcAvg', () => {
    it('Adds average property for year over number of months provided', () => {
      // Given
      const expenseSummary = {
        2017: {
          Jan: {
            total: '100',
            byCategory: {
              Clothing: '10',
              Food: '20',
              Entertainment: '30',
              Gifts: '40',
            },
          },
          Feb: {
            total: '80',
            byCategory: {
              Clothing: '20',
              Food: '20',
              Entertainment: '20',
              Gifts: '20',
            },
          },
        },
      };
      const expectedAvg = {
        monthly: '90.00',
        byCategory: {
          Clothing: '15.00',
          Food: '20.00',
          Entertainment: '25.00',
          Gifts: '30.00',
        },
      };
      // When
      calculator.calcAvg(expenseSummary);
      // Then
      expect(expenseSummary['2017'].average).to.deep.equal(expectedAvg);
    });
  });
});
