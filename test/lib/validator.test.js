const validator = require('../../lib/validator');
const { expect } = require('chai');

describe('validator', () => {
  describe('validateLine', () => {
    let output;

    beforeEach(() => {
      output = {
        hasErrors: false,
        errorLines: [],
      };
    });

    it('sets errors when number of fields is less than 4 and date field is invalid', () => {
      // Given
      const line = ['2021-04', '05', '78.34', 'Groceries', 'Metro', 'foo'];
      // When
      validator.validateLine(line, output);
      // Then
      const expectedOutput = {
        hasErrors: true,
        errorLines: [
          {
            line: '2021-04,05,78.34,Groceries,Metro,foo',
            description: 'Expected 4 fields, got 6.',
          },
          {
            line: '2021-04,05,78.34,Groceries,Metro,foo',
            description: 'Date format must be YYYY-MM-DD.',
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
        hasErrors: true,
        errorLines: [
          {
            line: '2021-04-05,78.34,Groceries',
            description: 'Expected 4 fields, got 3.',
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
        hasErrors: true,
        errorLines: [
          {
            line: '2021-04,78.34,Groceries,Metro',
            description: 'Date format must be YYYY-MM-DD.',
          },
        ],
      };
      expect(output).to.deep.equal(expectedOutput);
    });

    it('is valid when number of fields is 4', () => {
      // Given
      const line = ['2021-04-05', '78.34', 'Groceries', 'Metro'];
      // When
      validator.validateLine(line, output);
      // Then
      const expectedOutput = {
        hasErrors: false,
        errorLines: [],
      };
      expect(output).to.deep.equal(expectedOutput);
    });
  });
});
