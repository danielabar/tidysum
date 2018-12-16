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
});
