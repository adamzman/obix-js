const { RawRequestInstance } = require('../../src/requests/raw');

describe('RawRequestInstance', () => {
  let rawRequestInstance;
  let axiosPost = jest.fn();
  let axiosGet = jest.fn();

  beforeEach(() => {
    const mockAxiosInstance = {
      defaults: {
        baseURL: 'https://localhost:443/obix/',
      },
      post: axiosPost,
      get: axiosGet,
    };

    rawRequestInstance = new RawRequestInstance({ axiosInstance: mockAxiosInstance });
  });

  describe('post', () => {
    test('should handle valid request', async () => {
      rawRequestInstance.axiosInstance.post.mockResolvedValue({ data: 'mock result' });
      const path = 'Test/Path';
      const payload = 'Test Payload';

      const result = await rawRequestInstance.post({ path, payload });

      expect(result).toEqual({ action: 'rawPost', data: 'mock result', path: 'Test/Path' });
    });
    test('should throw error if axios fails', async () => {
      expect.assertions(1);
      rawRequestInstance.axiosInstance.post.mockRejectedValue(new Error());
      const path = 'Test/Path';
      const payload = 'Test Payload';

      try {
        await rawRequestInstance.post({ path, payload });
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });
  describe('get', () => {
    test('should handle valid request', async () => {
      rawRequestInstance.axiosInstance.get.mockResolvedValue({ data: 'mock result' });
      const path = 'Test/Path';

      const result = await rawRequestInstance.get({ path });

      expect(result).toEqual({ action: 'rawGet', data: 'mock result', path: 'Test/Path' });
    });
    test('should throw error if axios fails', async () => {
      expect.assertions(1);
      rawRequestInstance.axiosInstance.get.mockRejectedValue(new Error());
      const path = 'Test/Path';

      try {
        await rawRequestInstance.get({ path });
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });
});
