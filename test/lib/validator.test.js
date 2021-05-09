const validator = require('../../lib/validator');
const { expect } = require('chai');

describe('validator', () => {
  describe('validateLine', () => {
    let output;

    beforeEach(() => {
      output = {
        lineErrors: [],
      };
    });

    it('sets errors when number of fields is greater than 4 and date field is invalid', () => {
      // Given
      const line = ['2021-04', '05', '78.34', 'Groceries', 'Metro', 'foo'];
      // When
      validator.validateLine(line, output);
      // Then
      const expectedOutput = {
        lineErrors: [
          {
            line: '2021-04,05,78.34,Groceries,Metro,foo',
            errors: ['Expected 4 fields, got 6.', 'Date format must be YYYY-MM-DD.'],
          },
        ],
      };
      expect(output).to.deep.equal(expectedOutput);
    });

    it('sets error when number of fields is less than 4', () => {
      // Given
      const line = ['2021-04-05', '78.34', 'Groceries'];
      // When
      validator.validateLine(line, output);
      // Then
      const expectedOutput = {
        lineErrors: [
          {
            line: '2021-04-05,78.34,Groceries',
            errors: ['Expected 4 fields, got 3.'],
          },
        ],
      };
      expect(output).to.deep.equal(expectedOutput);
    });

    it('sets error when date format is incorrect', () => {
      // Given
      const line = ['2021-04', '78.34', 'Groceries', 'Metro'];
      // When
      validator.validateLine(line, output);
      // Then
      const expectedOutput = {
        lineErrors: [
          {
            line: '2021-04,78.34,Groceries,Metro',
            errors: ['Date format must be YYYY-MM-DD.'],
          },
        ],
      };
      expect(output).to.deep.equal(expectedOutput);
    });

    it('sets error when amount is not numeric', () => {
      // Given
      const line = ['2021-04-27', '1o7.e8', 'Groceries', 'Metro'];
      // When
      validator.validateLine(line, output);
      // Then
      const expectedOutput = {
        lineErrors: [
          {
            line: '2021-04-27,1o7.e8,Groceries,Metro',
            errors: ['Amount must be numeric.'],
          },
        ],
      };
      expect(output).to.deep.equal(expectedOutput);
    });

    it('does not report any errors when input line is valid', () => {
      // Given
      const line = ['2021-04-05', '78.34', 'Groceries', 'Metro'];
      // When
      validator.validateLine(line, output);
      // Then
      const expectedOutput = {
        lineErrors: [],
      };
      expect(output).to.deep.equal(expectedOutput);
    });
  });
});
