const { UnknownTypeError } = require('../../src/errors');
const { parseValueType, buildOutputList } = require('../../src/parsers/values');

//#region Import Mocks
const { getEnumResponse } = require('../mocks/requests/standard/GET-enum');
const { postEnumResponse } = require('../mocks/requests/standard/POST-enum');
const { getBooleanResponse } = require('../mocks/requests/standard/GET-boolean');
const { postBooleanResponse } = require('../mocks/requests/standard/POST-boolean');
const { getStringResponse } = require('../mocks/requests/standard/GET-string');
const { postStringResponse } = require('../mocks/requests/standard/POST-string');
const { getNumericResponse } = require('../mocks/requests/standard/GET-numeric');
const { postNumericResponse } = require('../mocks/requests/standard/POST-numeric');

const { postBatchResponse: postBatchSomeErrors } = require('../mocks/requests/batch/POST-batch-some-errors');
const { postBatchResponse: postBatchNoErrors } = require('../mocks/requests/batch/POST-batch-no-errors');
const { postBatchResponse: postBatchOnlyErrors } = require('../mocks/requests/batch/POST-batch-only-errors');
//#endregion Import Mocks

describe('Value Parsers', () => {
  describe('parseValueType', () => {
    test('should parse a enum type', () => {
      const getExpect = { path: 'Test/EnumWritable', value: 'Test', action: 'read' };
      const getResult = parseValueType(getEnumResponse);
      expect(getExpect).toEqual(getResult);

      const postExpect = { path: 'Test/EnumWritable', value: 'Test2', action: 'write' };
      const postResult = parseValueType(postEnumResponse);
      expect(postExpect).toEqual(postResult);
    });
    test('should parse a boolean type', () => {
      const getExpect = { path: 'Test/BooleanWritable', value: false, action: 'read' };
      const getResult = parseValueType(getBooleanResponse);
      expect(getExpect).toEqual(getResult);

      const postExpect = { path: 'Test/BooleanWritable', value: false, action: 'write' };
      const postResult = parseValueType(postBooleanResponse);
      expect(postExpect).toEqual(postResult);
    });
    test('should parse a string type', () => {
      const getExpect = { path: 'Test/StringWritable', value: 'Test', action: 'read' };
      const getResult = parseValueType(getStringResponse);
      expect(getExpect).toEqual(getResult);

      const postExpect = { path: undefined, value: 'Testing', action: 'write' };
      const postResult = parseValueType(postStringResponse);
      expect(postExpect).toEqual(postResult);
    });
    test('should parse a numeric / real type', () => {
      const getExpect = { path: 'Test/Ramp', value: 6.88, action: 'read' };
      const getResult = parseValueType(getNumericResponse);
      expect(getExpect).toEqual(getResult);

      const postExpect = { path: undefined, value: 200.15, action: 'write' };
      const postResult = parseValueType(postNumericResponse);
      expect(postExpect).toEqual(postResult);
    });
    test('should throw UnknownTypeError', () => {
      try {
        parseValueType({ invalidType: 'test' });
      } catch (error) {
        expect(error).toBeInstanceOf(UnknownTypeError);
      }
    });
  });
  describe('buildOutputList', () => {
    test('should build output list with error and value entries', () => {
      const result = buildOutputList(postBatchSomeErrors);
      expect(result).toEqual([
        { path: 'Test/BooleanWritable2', reason: 'Invalid Path/Uri: /Test/BooleanWritable2/out', error: true },
        { path: undefined, value: 50, action: 'write' },
      ]);
    });
    test('should build values list with various value types', () => {
      const result = buildOutputList(postBatchNoErrors);
      expect(result).toEqual([
        { path: undefined, value: 50, action: 'write' },
        { path: 'Test/BooleanWritable', value: false, action: 'read' },
      ]);
    });
    test('should build error list from error entries', () => {
      const result = buildOutputList(postBatchOnlyErrors);
      expect(result).toEqual([
        { path: 'Test/BooleanWritable2', reason: 'Invalid Path/Uri: /Test/BooleanWritable2/out', error: true },
        { path: 'Test/NumericWritable1', reason: 'Invalid Path/Uri: /Test/NumericWritable1/set', error: true },
      ]);
    });
  });
});
