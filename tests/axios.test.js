const https = require('https');
const { HTTPError } = require('../src/errors');
const { parseError } = require('../src/parsers/errors');
const { createInstance } = require('../src/axios');

describe('Axios', () => {
  describe('createInstance', () => {
    test('creates an axios instance with correct configuration', () => {
      const protocol = 'https';
      const host = 'example.com';
      const port = 443;
      const username = 'user';
      const password = 'pass';

      const axiosInstance = createInstance({ protocol, host, port, username, password });

      expect(axiosInstance.defaults.baseURL).toBe(`https://example.com:443/obix/`);
      expect(axiosInstance.defaults.timeout).toBe(2000);
      expect(axiosInstance.defaults.auth).toEqual({ username, password });
      expect(axiosInstance.defaults.httpsAgent).toBeInstanceOf(https.Agent);
      expect(axiosInstance.defaults.transformResponse).toContainEqual(expect.any(Function));
    });

    test('creates an axios instance with timeout override', () => {
      const protocol = 'https';
      const host = 'example.com';
      const port = 443;
      const username = 'user';
      const password = 'pass';
      const timeout = 5000;

      const axiosInstance = createInstance({ protocol, host, port, username, password, timeout });

      expect(axiosInstance.defaults.baseURL).toBe(`https://example.com:443/obix/`);
      expect(axiosInstance.defaults.timeout).toBe(timeout);
      expect(axiosInstance.defaults.auth).toEqual({ username, password });
      expect(axiosInstance.defaults.httpsAgent).toBeInstanceOf(https.Agent);
      expect(axiosInstance.defaults.transformResponse).toContainEqual(expect.any(Function));
    });

    test('throws ProtocolError for invalid protocol', () => {
      expect.assertions(4);
      const invalidProtocol = 'ftp';
      const config = { protocol: invalidProtocol, host: 'example.com', port: 443, username: 'user', password: 'pass' };

      try {
        createInstance(config);
      } catch (error) {
        expect(error.message).toBe('Invalid Security Protocol');
        expect(error.name).toBe('ProtocolError');
        expect(error.friendlyError).toBe('Invalid Security Protocol');
        expect(error.inDepthError).toBe('Invalid Security Protocol:\nProtocol must be either "https" or "http"');
      }
    });

    test('interceptor parses error response', async () => {
      const axiosInstance = createInstance({
        protocol: 'https',
        host: 'example.com',
        port: 443,
        username: 'user',
        password: 'pass',
      });

      axiosInstance.interceptors.response.handlers[0].fulfilled({ headers: { 'set-cookie': ['test-cookie'] }, data: { err: 'some-error' } });

      expect(axiosInstance.defaults.headers.Cookie).toBe('test-cookie');
      expect(() => parseError('some-error')).not.toThrow();
    });

    test('interceptor throws HTTPError for rejected response', async () => {
      const axiosInstance = createInstance({
        protocol: 'https',
        host: 'example.com',
        port: 443,
        username: 'user',
        password: 'pass',
      });

      const error = { message: 'Request failed', response: { data: 'error-data' } };

      expect(() => axiosInstance.interceptors.response.handlers[0].rejected(error)).toThrow(HTTPError);
    });
  });
});
