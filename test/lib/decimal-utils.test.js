const decimalUtil = require('../../lib/decimal-util');
const { expect } = require('chai');

describe('decimalUtil', () => {
  describe('subtract', () => {
    it('Subtracts two decimal numbers and returns string representation', () => {
      // Given
      const in1 = 25.35;
      const in2 = 20.25;
      // When
      const result = decimalUtil.subtract(in1, in2);
      // Then
      expect(result).to.equal('5.1');
    });
  });

  describe('percentDiff', () => {
    it('Returns percentage increase when current is greater than previous', () => {
      // Given
      const prev = '80';
      const cur = '100';
      // When
      const result = decimalUtil.percentDiff(prev, cur);
      // Then
      expect(result).to.equal('25');
    });

    it('Returns percentage decrease when current is less than previous', () => {
      // Given
      const prev = '100';
      const cur = '80';
      // When
      const result = decimalUtil.percentDiff(prev, cur);
      // Then
      expect(result).to.equal('-20');
    });

    it('Returns 0 when current is the same as previous', () => {
      // Given
      const prev = '80';
      const cur = '80';
      // When
      const result = decimalUtil.percentDiff(prev, cur);
      // Then
      expect(result).to.equal('0');
    });

    it('Rounds to 2 decimal places', () => {
      // Given
      const prev = '900';
      const cur = '1000';
      // When
      const result = decimalUtil.percentDiff(prev, cur);
      // Then
      expect(result).to.equal('11.11');
    });
  });
});
