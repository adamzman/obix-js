const { HTTPError, PathError, InvalidTypeError, UnknownTypeError } = require('../src/errors'); // Adjust the path accordingly

describe('Errors', () => {
  describe('HTTPError', () => {
    test('should handle ECONNABORTED error', () => {
      const error = { code: 'ECONNABORTED' };
      const httpError = new HTTPError(error);
      expect(httpError.name).toEqual('HTTPError');
      expect(httpError.friendlyError).toEqual('Connection Error - Timeout');
      expect(httpError.inDepthError).toContain('Error ECONNABORTED');
    });

    test('should handle 401 error', () => {
      const error = { message: '401 Unauthorized' };
      const httpError = new HTTPError(error);
      expect(httpError.name).toEqual('HTTPError');
      expect(httpError.friendlyError).toEqual('Invalid Username/Password - 401');
      expect(httpError.inDepthError).toContain('Error 401');
    });

    test('should handle 403 error', () => {
      const error = { message: '403 Forbidden' };
      const httpError = new HTTPError(error);
      expect(httpError.name).toEqual('HTTPError');
      expect(httpError.friendlyError).toEqual('Permission Error - 403');
      expect(httpError.inDepthError).toContain('Error 403');
    });

    test('should handle 404 error', () => {
      const error = { message: '404 Not Found' };
      const httpError = new HTTPError(error);
      expect(httpError.name).toEqual('HTTPError');
      expect(httpError.friendlyError).toEqual('Obix Driver Missing - 404');
      expect(httpError.inDepthError).toContain('Error 404');
    });

    test("should handle 'wrong version number' error", () => {
      const error = { message: 'wrong version number' };
      const httpError = new HTTPError(error);
      expect(httpError.name).toEqual('HTTPError');
      expect(httpError.friendlyError).toEqual('Possibly Wrong Port/Protocol');
      expect(httpError.inDepthError).toContain('Check the port and security protocol');
    });

    test('should handle unknown error', () => {
      const error = { message: 'Some unknown error' };
      const httpError = new HTTPError(error);
      expect(httpError.name).toEqual('HTTPError');
      expect(httpError.friendlyError).toEqual(error.message);
    });
  });

  describe('PathError', () => {
    test('should handle PathError', () => {
      const path = '/invalid-path';
      const reason = 'Path not found';
      const pathError = new PathError(path, reason);
      expect(pathError.name).toEqual('PathError');
      expect(pathError.message).toEqual(`Invalid Path/Uri: ${path}`);
      expect(pathError.inDepthError).toContain(reason);
    });
  });

  describe('InvalidTypeError', () => {
    test('should handle InvalidTypeError', () => {
      const invalidTypeError = new InvalidTypeError();
      expect(invalidTypeError.name).toEqual('InvalidTypeError');
      expect(invalidTypeError.message).toEqual('Invalid Input Type');
      expect(invalidTypeError.inDepthError).toContain('Invalid Input Type');
    });
  });

  describe('UnknownTypeError', () => {
    test('should handle UnknownTypeError', () => {
      const unknownTypeError = new UnknownTypeError();
      expect(unknownTypeError.name).toEqual('UnknownTypeError');
      expect(unknownTypeError.message).toEqual('Unknown Data Type');
      expect(unknownTypeError.inDepthError).toContain('Unknown Data Type');
    });
  });
});
