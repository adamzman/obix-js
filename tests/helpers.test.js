const { PathError } = require('../src/errors');
const { stripPaths, makeArray, replaceSpecialChars } = require('../src/helpers');

describe('Helpers', () => {
  describe('stripPaths', () => {
    test("removes the leading and ending '/' from a single path", () => {
      const path = '/Testing/Path/';
      const results = stripPaths(path);
      expect(results).toEqual(['Testing/Path']);
    });
    test("removes the leading and ending '/' from an array of paths", () => {
      const paths = ['/Testing/Path/', 'Testing/Path2/'];
      const results = stripPaths(paths);
      expect(results).toEqual(['Testing/Path', 'Testing/Path2']);
    });
    test('throws error if there is no path / paths', () => {
      expect.assertions(2);
      try {
        const paths = [];
        stripPaths(paths);
      } catch (error) {
        expect(error).toBeInstanceOf(PathError);
      }
      try {
        const path = null;
        stripPaths(path);
      } catch (error) {
        expect(error).toBeInstanceOf(PathError);
      }
    });
  });

  describe('makeArray', () => {
    test('should make an array if passed a single value', () => {
      const result = makeArray('value');
      expect(result).toEqual(['value']);
    });
    test('should make an array if passed an array', () => {
      const result = makeArray(['value', 'value2']);
      expect(result).toEqual(['value', 'value2']);
    });
  });

  describe('replaceSpecialChars', () => {
    test('should replace all special characters', () => {
      const input = '& " < > \'';
      const expected = '&amp; &quot; &lt; &gt; &apos;';
      const result = replaceSpecialChars(input);
      expect(result).toEqual(expected);
    });
    test('should not modify input without special characters', () => {
      const input = 'Hello World';
      const result = replaceSpecialChars(input);
      expect(result).toEqual(input);
    });
    test('should handle empty string input', () => {
      const input = '';
      const result = replaceSpecialChars(input);
      expect(result).toEqual(input);
    });
    test('should handle non-string input', () => {
      const input = 42; // Example non-string input
      const result = replaceSpecialChars(input);
      expect(result).toEqual(input);
    });
  });
});
