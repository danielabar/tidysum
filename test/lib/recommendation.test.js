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
      // Then makes savings recommendations...
      expect(expSum['2017'].recommendation.save).to.equal('700');
      expect(expSum['2018'].recommendation.save).to.equal('680');
      // ... and calculates 6 and 12 months worth of living expenses that should be saved
      expect(expSum['2017'].recommendation.save6MonthsExpenses).to.equal('7800'); // (500 + 800) * 6
      expect(expSum['2017'].recommendation.save12MonthsExpenses).to.equal('15600'); // (500 + 800) * 12
      expect(expSum['2018'].recommendation.save6MonthsExpenses).to.equal('7920'); // (520 + 800) * 6
      expect(expSum['2018'].recommendation.save12MonthsExpenses).to.equal('15840'); // (520 + 800) * 12
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
      // Then makes savings recommendations...
      expect(expSum['2017'].recommendation.reduceSpendingBy).to.equal('100');
      expect(expSum['2018'].recommendation.save).to.equal('680');
      // ... and calculates 6 and 12 months worth of living expenses that should be saved
      expect(expSum['2017'].recommendation.save6MonthsExpenses).to.equal('12600'); // (1300 + 800) * 6
      expect(expSum['2017'].recommendation.save12MonthsExpenses).to.equal('25200'); // (1300 + 800) * 12
      expect(expSum['2018'].recommendation.save6MonthsExpenses).to.equal('7920'); // (520 + 800) * 12
      expect(expSum['2018'].recommendation.save12MonthsExpenses).to.equal('15840'); // (520 + 800) * 12
    });
  });
});
