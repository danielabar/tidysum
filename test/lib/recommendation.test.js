const recommendation = require('../../lib/recommendation');
const { expect } = require('chai');

describe('recommendation', () => {
  describe('determine', () => {
    it('Determines monthly saving recommendation based on yearly averages, monthly income and fixed expenses', () => {
      // Given
      const expSum = {
        2017: {
          average: { monthly: '500' },
        },
        2018: {
          average: { monthly: '520' },
        },
      };
      const monthlyIn = '2000';
      const fixedExp = '800';
      // When
      recommendation.determine(expSum, monthlyIn, fixedExp);
      // Then
      expect(expSum['2017'].recommendation.save).to.equal('700');
      expect(expSum['2018'].recommendation.save).to.equal('680');
    });

    it('Recommends reduction in spending when sum of average variable and fixed exceeds monthly income', () => {
      // Given
      const expSum = {
        2017: {
          average: { monthly: '1300' },
        },
        2018: {
          average: { monthly: '520' },
        },
      };
      const monthlyIn = '2000';
      const fixedExp = '800';
      // When
      recommendation.determine(expSum, monthlyIn, fixedExp);
      // Then
      expect(expSum['2017'].recommendation.reduceSpendingBy).to.equal('100');
      expect(expSum['2018'].recommendation.save).to.equal('680');
    });
  });
});
