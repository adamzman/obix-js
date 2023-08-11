const { PathError, InvalidTypeError } = require('../../src/errors');
const { parseError } = require('../../src/parsers/errors');

describe('Parsers Errors', () => {
  describe('parseError', () => {
    describe('throwing PathError', () => {
      test('should throw PathError for BadUriErr', () => {
        const error = {
          _attributes: {
            display: 'Test',
            is: 'obix:BadUriErr',
            href: '/some/path',
          },
        };
        expect(() => parseError(error)).toThrow(PathError);
      });
      test('should throw PathError for Path depth', () => {
        const error = {
          _attributes: {
            display: 'Path depth',
            is: 'Test',
            href: '/some/invalid/path',
          },
        };
        expect(() => parseError(error)).toThrow(PathError);
      });
      test('should throw PathError for Invalid name in path', () => {
        const error = {
          _attributes: {
            display: 'Invalid name in path',
            is: 'Test',
            href: '/some/invalid/path',
          },
        };
        expect(() => parseError(error)).toThrow(PathError);
      });
    });

    describe('throwing InvalidTypeError', () => {
      test("should throw InvalidTypeError for display containing 'Invalid'", () => {
        const error = {
          _attributes: {
            display: 'Invalid input data',
          },
        };
        expect(() => parseError(error)).toThrow(InvalidTypeError);
      });
    });

    describe('throwing Error', () => {
      test('should throw Error with custom message for other errors', () => {
        const error = {
          _attributes: {
            display: 'Some other error message',
            is: 'SomeErrorType',
          },
        };
        const expectedError = new Error('SomeErrorType');
        expect(() => parseError(error)).toThrow(expectedError);
      });
      test('should throw Error with display message when no reason', () => {
        const error = {
          _attributes: {
            display: 'An error occurred',
          },
        };
        const expectedError = new Error('An error occurred');
        expect(() => parseError(error)).toThrow(expectedError);
      });
    });

    test('should not throw for undefined error object', () => {
      expect(() => parseError(undefined)).not.toThrow();
    });
    test('should not throw for error object with no display or reason', () => {
      const error = {
        _attributes: {},
      };
      expect(() => parseError(error)).not.toThrow();
    });
  });
});
